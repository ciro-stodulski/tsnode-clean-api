import { RouteConfig, HttpResponse, HttpRequest } from '..';

export interface Controller {
  route_configs: RouteConfig;

  handle(req: HttpRequest): Promise<HttpResponse | void>;

  exception(error: unknown): Error;
}
