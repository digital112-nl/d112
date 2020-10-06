import { UseAuth } from '@tsed/common';
import { applyDecorators } from '@tsed/core';
import { Operation, Responses, Security } from '@tsed/swagger';
import { AuthenticationMiddleware } from '../middleware/AuthenticationMiddleware';

export function CustomAuth(options: {
    role?: string
}): Function {
    return applyDecorators(
        UseAuth(AuthenticationMiddleware, options),
        Security("apiKey"),
        Operation({
            "parameters": [
                {
                    "in": "header",
                    "name": "Authorization",
                    "type": "string",
                    "required": true
                }
            ]
        }),
        Responses(401, {description: "Unauthorized"}),
        Responses(403, {description: "Forbidden"})
    )
}