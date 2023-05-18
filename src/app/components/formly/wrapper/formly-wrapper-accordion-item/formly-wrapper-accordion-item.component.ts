import { Component, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-formly-wrapper-accordion-item',
  templateUrl: './formly-wrapper-accordion-item.component.html',
  styleUrls: ['./formly-wrapper-accordion-item.component.scss'],
})
export class FormlyWrapperAccordionItemComponent extends FieldWrapper {
  uid = '';
  uuid = '';

  ngOnInit() {
    this.uid = UUID.UUID();
    this.uid = 'uid' + this.uid.toString().replaceAll('-', '');
    this.uuid = 'u' + this.uid;
  }
}
