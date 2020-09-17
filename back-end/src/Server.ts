import { GlobalAcceptMimesMiddleware, PlatformApplication } from '@tsed/common';
import { Configuration, Inject } from '@tsed/di';
import '@tsed/mongoose';
import '@tsed/platform-express';
import '@tsed/swagger';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as methodOverride from 'method-override';

@Configuration({
  rootDir: __dirname,
  acceptMimes: [ 'application/json' ],
  port: process.env.PORT || 8000,
  httpsPort: false,
  passport: {},
  mongoose: {
    url: process.env.mongoose_url || 'mongodb://127.0.0.1:27017/d112',
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  swagger: {
    path: '/api-docs'
  },
  mount: {
    '/api/v1': './src/modules/**/*Controller.ts'
  },
  debug: false
})
export class Server {
  @Inject()
  app: PlatformApplication;

  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(cors({
        origin: '*'
      }))
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }
}
