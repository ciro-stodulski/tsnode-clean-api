import { expect } from 'chai';
import { ValidationError } from '..';

describe('Shared- errors - ValidationError ', () => {
  it('Should create ValidationError', () => {
    const instance_error = new ValidationError([]);

    const message = 'Invalid request data';
    const code = 'VALIDATION_FAILED';

    expect(instance_error.code).to.be.eqls(code);
    expect(instance_error.message).to.be.eqls(message);
    expect(instance_error.details).to.be.eqls([]);
    expect(instance_error.toJSON()).to.be.eqls({
      message,
      code,
      details: [],
    });
  });
});
