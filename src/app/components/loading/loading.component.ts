import { Component, Input, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  options: AnimationOptions = {
    path: './assets/animations/loading.json',
  };
  @Input() is_load: boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }

}
