import { BodyParams, ContentType, Controller, Get, PathParams, Post, Returns, ReturnsArray } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { Inject } from '@tsed/di';
import { User, UserCreateUpdate } from './User';


@Controller('/user')
export class UserController {
  @ContentType('application/json')
  @Inject(User)
  private userModel: MongooseModel<User>;

  @Post('/register')
  @Returns(User)
  async register(@BodyParams() payload: UserCreateUpdate) {
    const user = new this.userModel({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password
    } as User)
    await user.save();
    return user;
  }

}