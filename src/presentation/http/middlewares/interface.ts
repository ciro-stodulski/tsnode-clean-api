import { HttpRequest, HttpResponse } from 'src/presentation/http';

export interface Middleware {
  handle(req: HttpRequest, error?: Error): HttpResponse | Promise<void>;
}
