import { Middleware, HttpRequest, Unauthorized } from 'src/presentation/http';

export class AuthMiddleware implements Middleware {
  async handle(req: HttpRequest) {
    const token = req.headers.authorization as string;
    if (!token || !token.startsWith('Bearer ')) {
      throw new Unauthorized('UNAUTHORIZED', 'authentication failed');
    }
    const replaced_token = token.replace('Bearer ', '');

    req.user = {
      token: replaced_token,
    };
  }
}
