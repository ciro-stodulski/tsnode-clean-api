import { HttpError } from '..';

export class NotFoundError extends HttpError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 404, details);
  }
}
