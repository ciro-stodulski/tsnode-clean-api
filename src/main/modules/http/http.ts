import Joi from 'joi';

import express, {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Express,
} from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as http from 'http';
import {
  Controller,
  HttpResponse,
  Middleware,
  ErrorHandlerMiddleware,
  HttpRequest,
  BadRequest,
  CreateTodoController,
  ListTodoController,
  NotFoundError,
} from '../../../presentation/http';
import { Container } from '../../container';
import { Module } from '..';
import { logger } from '../../../shared/logger';

export class HttpModule implements Module {
  readonly app: Express = express();

  private server: http.Server;

  readonly router: Router = Router({ mergeParams: true });

  readonly controllers: Controller[] = [];

  constructor(container: Container, private port: number) {
    this.controllers = [
      new ListTodoController(container.list_todo_use_case),
      new CreateTodoController(container.create_todo_use_case),
    ];
  }

  close(): void {
    this.server.close();
    logger.warn('Http: disconnecting');
  }

  start(): void {
    this.app.set('trust proxy', true);
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(
      bodyParser.json({
        limit: '10kb',
      })
    );

    this.router.get(
      ['/info', '/status'],
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          res.sendStatus(204);
        } catch (err) {
          next(err);
        }
      }
    );

    this.app.use(this.buildRoutes());

    this.app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        next(new NotFoundError('PAGE_NOT_FOUND', 'Page not found'));
      }
    );
    const error_handler = this.errorHandler() as any;
    this.app.use(error_handler);
    this.server = this.app.listen(this.port, () =>
      logger.info(`Http: Server running on port ${this.port}`)
    );
  }

  private buildRoutes(): Router {
    for (const controller of this.controllers) {
      const { route_configs } = controller;

      const { path, middlewares, method, status_code, schema } = route_configs;

      let request_validator = null;

      if (schema) {
        request_validator = this.requestValidator(schema);
      }

      const func = this.requestHandle(controller, status_code);

      let func_middleware: RequestHandler[] = [];

      if (middlewares) {
        func_middleware = this.buildMiddlewares(middlewares);
      }

      const jobs = schema
        ? ([...func_middleware, request_validator, func] as any)
        : ([...func_middleware, func] as any);

      switch (method) {
        case 'get':
          this.router.get(path, jobs);
          break;
        case 'post':
          this.router.post(path, jobs);
          break;
        case 'put':
          this.router.put(path, jobs);
          break;
        case 'patch':
          this.router.patch(path, jobs);
          break;
        case 'delete':
          this.router.delete(path, jobs);
          break;
        default:
          break;
      }
    }

    return this.router;
  }

  private buildMiddlewares(middlewares: Middleware[]): RequestHandler[] {
    return middlewares.map((middleware: Middleware) => {
      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          await middleware.handle(req);
          next();
        } catch (err) {
          next(err);
        }
      };
    });
  }

  private requestHandle(
    instance: Controller,
    status_code?: number
  ): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = (await instance.handle(req)) as HttpResponse;
        if (response?.headers) {
          for (const header in response.headers) {
            res.setHeader(header, response.headers[header]);
          }
        }

        const http_status = status_code || response.status;
        if (http_status) {
          res.status(http_status);
        }

        res.send(response?.data);
      } catch (err) {
        const error = instance.exception(err);
        next(error);
      }
    };
  }

  protected errorHandler(): unknown {
    const error_handler = new ErrorHandlerMiddleware();

    return (err: any, req: HttpRequest, res: Response, next: NextFunction) => {
      const { data, status } = error_handler.handle(req, err);
      res.status(status!).send(data);
      return next();
    };
  }

  private requestValidator(schema: Joi.Schema): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true,
      });

      if (validation.error) {
        logger.info(req?.body);
        logger.info(req?.params);
        logger.info(req?.query);
        return next(
          new BadRequest(
            'VALIDATION_FAILED',
            'Invalid request data',
            validation.error.details
          )
        );
      }

      Object.assign(req, validation.value);

      return next();
    };
  }
}
