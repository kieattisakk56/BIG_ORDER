import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-control',
  templateUrl: './floating-control.component.html',
  styleUrls: ['./floating-control.component.scss'],
})
export class FloatingControlComponent implements OnInit {
  show = false;

  constructor() {}

  ngOnInit(): void {}

  collapse = (value?: boolean) => {
    if (value != null) {
      this.show = value;
    } else {
      this.show = !this.show;
    }
  };
}
