import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-card',
  templateUrl: './button-card.component.html',
  styleUrls: ['./button-card.component.scss'],
})
export class ButtonCardComponent implements OnInit {
  @Input() value!: number;
  @Input() title!: string;
  @Input() color!: string;
  @Input() active: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
