import { Inject, Service } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { User } from '.././user/User';
import { UserApiKey, authenticate } from '.././UserApiKey';

@Service()
export class AuthenticationService {
    constructor() {}
    @Inject(UserApiKey)
    private userApiKeyModel: MongooseModel<UserApiKey>;
    @Inject(User)
    private userModel: MongooseModel<User>;

    public async getUserByToken(token: string): Promise<User|null> {
        const userApiKey: UserApiKey = await this.userApiKeyModel.findOne({
            token,
        }).populate('user').exec();
        return userApiKey?.user as User;
    }

    public async authenticate(headers: authenticate): Promise<UserApiKey|null> {
        const buff = (Buffer.from((headers.authorization.split(' '))[1], 'base64')).toString('utf-8').split(':')
        const email = buff[0]
        const password = buff[1]
        const account: User = await this.userModel.findOne({
            email: email
        }).exec();

        if (await account.verifyPassword(password)) {
            const apiKey = new this.userApiKeyModel({
                user: account
            } as UserApiKey)
            await apiKey.save();
            return apiKey
        }

    }
}