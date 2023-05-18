import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-frame',
  templateUrl: './mobile-frame.component.html',
  styleUrls: ['./mobile-frame.component.scss'],
})
export class MobileFrameComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
  }
}
