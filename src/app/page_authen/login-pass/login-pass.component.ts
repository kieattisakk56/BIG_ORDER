import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';

@Component({
  selector: 'app-login-pass',
  templateUrl: './login-pass.component.html',
  styleUrls: ['./login-pass.component.scss']
})
export class LoginPassComponent implements OnInit {
  options: AnimationOptions = {
    path: './assets/animations/login.json',
  };
  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('home');
    }, 2200);
  }
  animationCreated(animationItem: AnimationItem): void {
  }
}
