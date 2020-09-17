import { Middleware, Next, Req } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { validateExpressRequest } from 'twilio';
import { validateRequestWithBody } from 'twilio/lib/webhooks/webhooks';

const {
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_TOKEN
} = process.env;

@Middleware()
export class TwilioMiddleware {
  use(
    @Req() req: Req,
    @Next() next: Next
  ) {
    const valid = validateExpressRequest(req, TWILIO_AUTH_TOKEN, {});

    if ( !valid ) {
      throw new Unauthorized('Not coming from Twilio... Who are you?');
    }

    next();
  }
}
