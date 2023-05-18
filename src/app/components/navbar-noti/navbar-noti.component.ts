import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-noti',
  templateUrl: './navbar-noti.component.html',
  styleUrls: ['./navbar-noti.component.scss'],
})
export class NavbarNotiComponent implements OnInit {
  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
