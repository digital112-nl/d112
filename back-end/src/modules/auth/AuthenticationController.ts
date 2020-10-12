import { BodyParams, Controller, Get, Post, Req, Returns } from '@tsed/common';
import { Inject } from '@tsed/di';
import { Authenticate } from './models/Authenticate';
import { TokenAuth } from './decorator/TokenAuth';
import { AuthenticationService } from './AuthenticationService';
import { UserRegister } from './models/UserRegister';
import { RequestWithUser } from './models/RequestWithUser';
import { UserApiKey } from './user/UserApiKey';

@Controller('/auth')
export class AuthenticationController {
  @Inject(AuthenticationService)
  private authenticationService = new AuthenticationService;

  @Post('/login')
  @Returns(UserApiKey)
  public authenticate(
    @BodyParams() authenticate: Authenticate
  ): Promise<UserApiKey> {
    return this.authenticationService.authenticate(authenticate);
  }

  @Post('/register')
  @Returns(UserApiKey)
  public register(
    @BodyParams() payload: UserRegister
  ): Promise<UserApiKey> {
    return this.authenticationService.register(payload);
  }

  @TokenAuth()
  @Get('/me')
  @Returns(UserApiKey)
  public getMe(
    @Req() { apiKey }: RequestWithUser
  ): UserApiKey {
    return apiKey;
  }

}
