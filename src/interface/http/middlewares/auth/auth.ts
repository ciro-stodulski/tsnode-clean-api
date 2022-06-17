import { Middleware, HttpRequest } from '../..';

export class AuthMiddleware implements Middleware {
  async handle(req: HttpRequest) {
    const token = req.headers.authorization as string;
    if (!token || !token.startsWith('Bearer ')) {
      throw new Error('Unauthorize');
    }
    const replaced_token = token.replace('Bearer ', '');

    req.user = {
      token: replaced_token,
    };
  }
}
