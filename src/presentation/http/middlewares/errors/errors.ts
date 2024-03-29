import { logger } from 'src/shared/logger';
import {
  Middleware,
  HttpRequest,
  HttpResponse,
  HttpError,
} from 'src/presentation/http';

export class ErrorHandlerMiddleware implements Middleware {
  handle(req: HttpRequest, error: any): HttpResponse {
    if (error instanceof HttpError) {
      const { status_code, message, code, details } = error;
      return {
        data: {
          code,
          message,
          details,
        },
        status: status_code || 200,
      };
    }

    if (error?.code === 'ER_DUP_ENTRY') {
      return {
        data: {
          code: 'DUPLICATED_RESOURCE',
          message: 'duplicated resource',
        },
        status: 409,
      };
    }

    logger.error({ error });

    return {
      data: {
        code: 'UNEXPECTED_ERROR',
        message: 'error unexpected',
      },
      status: 500,
    };
  }
}
