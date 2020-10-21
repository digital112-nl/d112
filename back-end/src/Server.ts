import { Constant, GlobalAcceptMimesMiddleware, PlatformApplication } from '@tsed/common';
import { Configuration, Inject } from '@tsed/di';
import '@tsed/mongoose';
import '@tsed/platform-express';
import '@tsed/socketio';
import '@tsed/swagger';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import { ejs } from 'consolidate';

const rootDir = __dirname;


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
  viewsDir: `${rootDir}/views`,
  swagger: {
    path: '/api-docs',
    spec: {
      securityDefinitions: {
        'token': {
          'type': 'apiKey',
          'name': 'X-User-Token',
          'in': 'header'
        }
      }
    }
  },
  mount: {
    '/api/v1': './src/modules/**/*Controller.ts',
    '/location': './src/location/LocationController.ts'
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;
  @Constant('viewsDir')
  viewsDir: string;

  $onInit() {
    this.app.raw.set('views', this.viewsDir);
    this.app.raw.engine('ejs', ejs);
  }

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
