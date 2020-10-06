import { Required  } from '@tsed/common';
import { Model, ObjectID, PreHook, Unique } from '@tsed/mongoose';
import { hash, compare } from 'bcrypt';
import { isNull } from 'lodash';

export class UserCreateUpdate {
    @Required()
    public firstName: string;
    @Required()
    public lastName: string;
    @Required()
    public email: string;
    @Required()
    public password: string;
}

export class GetUser {
    @Required()
    public email: string;
}

@Model({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @Unique()
    @ObjectID('id')
    public _id: string;
    @Required ()
    public firstName: string;
    @Required ()
    public lastName: string;
    @Required ()
    public email: string;
    @Required ()
    public password: string;
    @Required()
    public updatedAt: Date;
    @Required()
    public createdAt: Date;


    @PreHook("validate")
    static preValidation(user: User, next) {
        if (!isNull(user.createdAt)) {
            user.createdAt = new Date();
            user.updatedAt = new Date();
        } else {
            user.updatedAt = new Date();
        }
        next();
    }

    @PreHook("save")
    static async preSave(user: User, next) {
        if (!isNull(user.password)) {
            try {
                user.password = await hash(user.password, 10);
            } catch (e) {
                throw e;
            }
        }
        next();
    }
    async verifyPassword(password: string) {
        return await compare(password, this.password);
    }

}

