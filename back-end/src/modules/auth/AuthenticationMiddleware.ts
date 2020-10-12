import { IMiddleware, Middleware, Req } from '@tsed/common';
import { isNil } from '@tsed/core';
import { Unauthorized } from '@tsed/exceptions';
import { Document } from 'mongoose';
import { AuthenticationService } from './AuthenticationService';
import { RequestWithUser } from './models/RequestWithUser';
import { User } from './user/User';

@Middleware()
export class AuthenticationMiddleware implements IMiddleware {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {
  }

  public async use(
    @Req() request: RequestWithUser
  ) {
    if ( isNil(request.headers[ 'x-user-token' ]) ) {
      throw new Unauthorized('Unauthorized');
    }

    const token: string = request.headers[ 'x-user-token' ] as string;
    const apiKey = await this.authenticationService.getUserByToken(token);

    if ( apiKey == null ) {
      throw new Unauthorized('Unauthorized');
    } else {
      request.user = apiKey.user as User & Document;
      request.apiKey = apiKey;
    }
  }
}
