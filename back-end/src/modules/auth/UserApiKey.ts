import { Required,Property } from '@tsed/common';
import { Model, PreHook, Ref, Unique, ObjectID } from '@tsed/mongoose';
import { User } from './user/User';

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
    user: Ref<User>
    @Property()
    public validUntil: Date;
    @Property()
    public token: string;
    @Property()
    public createdAt: Date;
 
    @PreHook("validate")
    static async validate(userApiKey: UserApiKey, next) {
        var TokenGenerator = require('token-generator') ({
            salt: '135',
            timestampMap: 'a682nfkaod'
        })
        userApiKey.validUntil = new Date();
        userApiKey.token =  TokenGenerator.generate();
        userApiKey.createdAt = new Date();
        next();
    }
}

export class session {
    @Ref(User)
    @Required()
    user: Ref<User>
    @Property()
    public session: string;
}

export class authenticate {
    @Property()
    public authorization: string;
}
