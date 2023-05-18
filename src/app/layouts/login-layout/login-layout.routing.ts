import { Routes } from '@angular/router';
import { LoginPassComponent } from 'src/app/page_authen/login-pass/login-pass.component';
import { LoginComponent } from 'src/app/page_authen/login/login.component';
import { MsAuthorizationComponent } from 'src/app/page_authen/ms-authorization/ms-authorization.component';

export const LoginLayoutRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        
    },
    {
        path: 'authorization',
        component: MsAuthorizationComponent
    },
    {
        path: 'loginpass',
        component: LoginPassComponent
    }
];
