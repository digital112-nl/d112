import { BodyParams, Controller, Get, Post, Req, Returns } from '@tsed/common';
import { Inject } from '@tsed/di';
import { Authenticate } from './models/Authenticate';
import { TokenAuth } from './decorator/TokenAuth';
import { AuthenticationService } from './AuthenticationService';
import { UserRegister } from './models/UserRegister';
import { RequestWithUser } from './models/RequestWithUser';
import { UserApiKey } from './user/UserApiKey';
import { UserSession } from './user/UserSession';

@Controller('/auth')
export class AuthenticationController {
  @Inject(AuthenticationService)
  private authenticationService = new AuthenticationService;

  @Post('/login')
  @Returns(UserSession)
  public authenticate(
    @BodyParams() authenticate: Authenticate
  ): Promise<UserSession> {
    return this.authenticationService.authenticate(authenticate) as Promise<UserSession>;
  }

  @Post('/register')
  @Returns(UserSession)
  public register(
    @BodyParams() payload: UserRegister
  ): Promise<UserSession> {
    return this.authenticationService.register(payload) as Promise<UserSession>;
  }

  @TokenAuth()
  @Get('/me')
  @Returns(UserSession)
  public getMe(
    @Req() { apiKey }: RequestWithUser
  ): UserSession {
    return apiKey as UserSession;
  }

}
