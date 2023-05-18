import { Component, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-wrapper-accordion',
  templateUrl: './formly-wrapper-accordion.component.html',
  styleUrls: ['./formly-wrapper-accordion.component.scss'],
})
export class FormlyWrapperAccordionComponent extends FieldWrapper {
  ngOnInit(): void {}
}
