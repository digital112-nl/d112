import { Returns, UseAuth } from '@tsed/common';
import { applyDecorators } from '@tsed/core';
import { Security } from '@tsed/swagger';
import { AuthenticationMiddleware } from './AuthenticationMiddleware';

export function TokenAuth(): Function {
  return applyDecorators(
    UseAuth(AuthenticationMiddleware),
    Security('token'),
    Returns(401, { description: 'Unauthorized' }),
    Returns(403, { description: 'Forbidden' })
  );
}
