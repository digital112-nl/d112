import { ContentType, Controller, Get, PathParams, Head, Returns, HeaderParams} from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { Inject } from '@tsed/di';
import { UserApiKey, authenticate } from './UserApiKey';
import { User } from './user/User';
import { AuthenticationService } from './services/AuthenticationService';

@Controller('/auth')
export class UserApiKeyController {
  @ContentType('application/json')
  @Inject(UserApiKey)
  private userApiKeyModel: MongooseModel<UserApiKey>;
  @Inject(AuthenticationService)
  private authenticationService = new AuthenticationService
  

  @Get('/login')
  @Returns(UserApiKey)
  async getApiKey(@HeaderParams() headers: authenticate) : Promise<any> {
      const apiKey = await this.authenticationService.authenticate(headers);
      console.log(apiKey.user)
      return {
        token: apiKey.token,
        validUntil: apiKey.validUntil
      }
  }

  @Get('/session')
  @Returns(UserApiKey)
  findOne(@HeaderParams() headers: any) {
      if (headers.authorization != null) {
      const token = (headers.authorization.split(' '))[1]
      return this.userApiKeyModel.findOne({
        token: token
    }).exec();
    }
    else {
      throw "authorization header is missing"
    }
  }
  
}