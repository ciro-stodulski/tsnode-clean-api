import { CodedError } from 'src/shared';

export class UserNotFoundError extends CodedError {
  constructor() {
    super('USER_NOT_FOUND', 'User not found.');
  }
}
