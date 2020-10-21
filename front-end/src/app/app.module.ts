import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from './api/api.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/auth/auth-interceptor/auth-interceptor';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { ROOT_URL } from './root-url';
import { ReportSocketService } from './shared/services/report-socket.service';
import { SharedModule } from './shared/shared.module';

export const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => AuthInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ModulesModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: ROOT_URL }),
    CoreModule
  ],
  providers: [
    ReportSocketService,
    AuthInterceptor,
    AUTH_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
