import { Component, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-wrapper-card',
  templateUrl: './formly-wrapper-card.component.html',
  styleUrls: ['./formly-wrapper-card.component.scss'],
})
export class FormlyWrapperCardComponent extends FieldWrapper {}
