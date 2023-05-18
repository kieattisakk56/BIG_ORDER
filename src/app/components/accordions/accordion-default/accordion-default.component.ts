import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-default',
  templateUrl: './accordion-default.component.html',
  styleUrls: ['./accordion-default.component.scss'],
})
export class AccordionDefaultComponent implements OnInit {
  @Input() title?: string | null = '';
  @Input() class?: string | null = '';
  @Input() isOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
