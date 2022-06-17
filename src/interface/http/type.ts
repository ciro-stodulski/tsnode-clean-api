import Joi from 'joi';
import { Middleware } from '.';

export type HttpRequest = {
  body?: any;
  params: any;
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
  version?: string;
  path: string;
  schema?: Joi.Schema;
  middlewares?: Middleware[];
  status_code: number;
};
