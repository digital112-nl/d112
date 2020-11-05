import { Inject, Service } from '@tsed/common';
import { Forbidden, Unauthorized } from '@tsed/exceptions';
import { MongooseModel } from '@tsed/mongoose';
import { Document } from 'mongoose';
import { Authenticate } from './models/Authenticate';
import { UserRegister } from './models/UserRegister';
import { User } from './user/User';
import { UserApiKey } from './user/UserApiKey';

@Service()
export class AuthenticationService {
  @Inject(UserApiKey)
  private userApiKeyModel: MongooseModel<UserApiKey>;
  @Inject(User)
  private userModel: MongooseModel<User>;

  public async getUserByToken(token: string): Promise<UserApiKey & Document> {
    const apiKey = await this.userApiKeyModel.findOne({
      token
    } as UserApiKey)
      .populate('user')
      .exec();

    if ( apiKey?.validUntil < (new Date()) ) {
      throw new Unauthorized('Api key no longer valid.');
    } else {
      return apiKey;
    }
  }

  public async authenticate({ email, password }: Authenticate): Promise<UserApiKey & Document> {
    const user: User = await this.userModel
      .findOne({
        email
      });

    const isPasswordCorrect = await user.verifyPassword(password);
    if ( !isPasswordCorrect ) {
      throw new Forbidden('Password not correct.');
    }

    return this.generateApiKey(user);
  }

  public async register({ firstName, lastName, email, password }: UserRegister): Promise<UserApiKey & Document> {
    const user = await new this.userModel({
      firstName,
      lastName,
      email,
      password
    } as User)
      .save();

    return this.generateApiKey(user);
  }

  private async generateApiKey(user: User): Promise<UserApiKey & Document> {
    const apiKey = new this.userApiKeyModel({
      user
    } as UserApiKey);
    await apiKey.save();
    return apiKey;
  }
}
