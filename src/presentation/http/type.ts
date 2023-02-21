import Joi from 'joi';
import { Middleware } from 'src/presentation/http';

export type HttpRequest<T = any> = {
  body: T;
  params?: any;
  query?: any;
  headers?: any;
  user?: {
    token: string;
  };
};

export type HttpResponse<T = any> = {
  data?: T;
  headers?: any;
  status?: number;
};

export type RouteConfig = {
  method: string;
  path: string;
  schema?: Joi.Schema;
  middlewares?: Middleware[];
  status_code: number;
};
