import { HttpRequest, HttpResponse } from '..';

export interface Middleware {
  handle(req: HttpRequest, error?: Error): HttpResponse | Promise<void>;
}
