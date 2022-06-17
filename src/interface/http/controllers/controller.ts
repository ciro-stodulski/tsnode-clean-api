import { RouteConfig, HttpResponse, HttpRequest } from '..';

export abstract class Controller {
  abstract route_configs: RouteConfig;

  abstract handle(req: HttpRequest): Promise<HttpResponse | void>;

  abstract exception(error: unknown): Error;
}
