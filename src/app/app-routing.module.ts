import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

export const authContent: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/layouts/content-layout/content-layout.module').then(
        (m) => m.ContentLayoutModule
      ),
  },
];
export const adminContent: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/layouts/login-layout/login-layout.module').then(
        (m) => m.LoginLayoutModule
      ),
  },
];

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: authContent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: adminContent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
