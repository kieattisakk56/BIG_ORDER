import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginLayoutRoutes } from './login-layout.routing';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/page_authen/login/login.component';
import { MsAuthorizationComponent } from 'src/app/page_authen/ms-authorization/ms-authorization.component';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPassComponent } from 'src/app/page_authen/login-pass/login-pass.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    LoginComponent,
    LoginPassComponent,
    MsAuthorizationComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,

  ],
})
export class LoginLayoutModule { }
