import { CodedError } from '../../../shared';

export class HttpError extends CodedError {
  status_code: number;

  constructor(
    code: string,
    message: string,
    status_code: number,
    details?: Record<string, any>
  ) {
    super(code, message, details);
    this.status_code = status_code;
  }
}
