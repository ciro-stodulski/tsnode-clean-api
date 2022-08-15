import { status } from '@grpc/grpc-js';
import { GRPCError } from '../../grpc/exceptions';

export class NotFoundError extends GRPCError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, status.NOT_FOUND, details);
  }
}
