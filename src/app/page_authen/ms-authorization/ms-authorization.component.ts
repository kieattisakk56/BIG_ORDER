import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-ms-authorization',
  templateUrl: './ms-authorization.component.html',
  styleUrls: ['./ms-authorization.component.scss'],
})
export class MsAuthorizationComponent implements OnInit {
  msAcceesToken: any;
  options: AnimationOptions = {
    path: './assets/animations/login.json',
  };
  constructor(
   
    private router: Router,
    private coreService: CoreService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.msAcceesToken = await this.getToken();
    await this.authen();
  }

  async getToken() {
    var url_string = window.location.href.replace('#', '?');
    return new URL(url_string).searchParams.get('access_token');
  }

  async authen() {
    // const body: any = {
    //   grant_type: 'password', // - delegation(O365) password(Local)
    //   scope: 'apiadmin',
    //   // scope: 'profileapi',
    //   // token: this.msAcceesToken, // O365 Token
    //   client_id: 'lifeplus_admin',
    //   provider: 'microsoft',
    //   client_secret: '2RS1AgHxtLG*pmIb',
    //   username: 'Jaidee@gmail.com',
    //   password: '123456',
    //   appVersion: 1.0,
    //   storeName: 'databaseStorage',
    //   role: 'admin',
    // };
    // const resp = await this.authenService.connectToken(body);
    // if (resp) {
    //   setTimeout(() => {
    //     this.router.navigateByUrl('home');
    //   }, 2000);
    // } else {
    //   // this.toastr.error('Something was wrong.', 'Error');
    //   // setTimeout(() => {
    //   //   this.router.navigateByUrl('login');
    //   // }, 2000);
    // }
  }
  animationCreated(animationItem: AnimationItem): void {}
}
