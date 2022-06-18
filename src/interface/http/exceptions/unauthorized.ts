import { HttpError } from '..';

export class Unauthorized extends HttpError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 401, details);
  }
}
