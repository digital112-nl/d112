import { Property, Required } from '@tsed/common';
import { Model, ObjectID, PreHook, Ref, Unique } from '@tsed/mongoose';
import { User } from './User';

const TokenGenerator = require('token-generator')({
  salt: '135',
  timestampMap: 'a682nfkaod'
});

@Model({
  schemaOptions: {
    timestamps: true
  }
})
export class UserApiKey {
  @Unique()
  @ObjectID('id')
  public _id: string;
  @Ref(User)
  @Required()
  user: Ref<User>;
  @Property()
  public validUntil: Date;
  @Property()
  public token: string;
  @Property()
  public createdAt: Date;

  @PreHook('validate')
  static async validate(
    userApiKey: UserApiKey,
    next
  ) {
    const currentDate = new Date;
    userApiKey.validUntil = new Date(currentDate.setDate(currentDate.getDate() + 1));
    userApiKey.token = TokenGenerator.generate();
    userApiKey.createdAt = new Date();
    next();
  }
}

