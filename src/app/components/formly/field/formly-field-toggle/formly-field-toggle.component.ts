import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-toggle',
  templateUrl: './formly-field-toggle.component.html',
  styleUrls: ['./formly-field-toggle.component.scss'],
})
export class FormlyFieldToggleComponent extends FieldType<FieldTypeConfig> {
  constructor() {
    super();
  }

  loading!: loadingDTO;
  guid = UUID.UUID();

  ngOnInit(): void {}

  change(value: any) {
    this.form.setValue(value);
  }
}
