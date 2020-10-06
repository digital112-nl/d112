import { Unauthorized } from '@tsed/exceptions';
import { IMiddleware, Middleware, Req } from '@tsed/common';
import { User } from '../user/User';
import { AuthenticationService } from '../services/AuthenticationService';

export interface RequestWithUser extends Req {
    user?: User
}

@Middleware()
export class AuthenticationMiddleware implements IMiddleware {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {
    }

    public async use(
        @Req() request: RequestWithUser
    ) {
        if (request.headers.authorization != null) {
            const token = (request.headers.authorization.split(' '))[1]
            const user = await this.authenticationService.getUserByToken(token);
            if (user == null) {
                throw new Unauthorized("Unauthorized");
            } else {
                request.user = user;
            }
        } else {
            throw new Unauthorized("Unauthorized");
        }
    }
}