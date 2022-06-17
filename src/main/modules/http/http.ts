import Joi from 'joi';

import express, {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import { Container } from '../../container';
import { Module } from '..';

import {
  Controller,
  HttpResponse,
  ListTodoController,
  Middleware,
} from '../../../interface/http';

export class HttpModule implements Module {
  constructor(protected container: Container) {}
  start(): void {
    const app = express();
    const router = Router({ mergeParams: true });

    app.set('trust proxy', true);
    app.use(helmet());
    app.use(compression());
    app.use(
      bodyParser.json({
        limit: '10kb',
      })
    );

    router.get(
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

    app.use(this.buildRoutes(router));

    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log('PAGE_NOT_FOUND', 'Page not found');
        next();
      }
    );

    app.listen(3000, () => console.log(`Server running on port 3000`));
  }

  protected loadControllers(): Controller[] {
    return [new ListTodoController(this.container.list_todo_use_case)];
  }

  protected buildRoutes(router: Router): Router {
    for (const controller of this.loadControllers()) {
      const { route_configs } = controller;

      const { path, middlewares, method, status_code, schema, has_schema } =
        route_configs;

      if (has_schema && !schema) {
        throw new Error(`Schema to ${controller} is mandatory.`);
      }

      const request_validator = this.requestValidator(schema);
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
          router.get(path, jobs);
          break;
        case 'post':
          router.post(path, jobs);
          break;
        case 'put':
          router.put(path, jobs);
          break;
        case 'patch':
          router.patch(path, jobs);
          break;
        case 'delete':
          router.delete(path, jobs);
          break;
        default:
          break;
      }
    }

    return router;
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

  private requestValidator(schema?: Joi.Schema): RequestHandler | void {
    if (!schema) return undefined;
    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true,
      });

      if (validation.error) {
        console.log(req?.body);
        console.log(req?.params);
        console.log(req?.query);
        return next(new Error('VALIDATION_FAILED'));
      }

      Object.assign(req, validation.value);

      return next();
    };
  }
}
