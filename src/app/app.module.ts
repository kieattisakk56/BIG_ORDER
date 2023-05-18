import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { ManagehttpInterceptor } from './managehttp.interceptor';
import { PipeModule } from './shared/pipe/pipe.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StatesModule } from './core/states/states.module';
import { InViewportModule } from 'ng-in-viewport';




@NgModule({
  declarations: [AppComponent, ContentLayoutComponent, LoginLayoutComponent],
  imports: [
    ComponentsModule,
    PipeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    DatePipe,
    StatesModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ManagehttpInterceptor,
      multi: true,
    },

    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
