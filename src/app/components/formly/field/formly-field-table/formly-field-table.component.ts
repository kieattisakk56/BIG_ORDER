import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-table',
  templateUrl: './formly-field-table.component.html',
  styleUrls: ['./formly-field-table.component.scss'],
})
export class FormlyFieldTableComponent extends FieldType<FieldTypeConfig> {
  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.to['config']) {
      this.to['config'].columns = this.formControl.value;
    }
  }

  async change(event: any) {
    if (this.to['change']) {
      const newVal = await this.to['change'](event);
      this.formControl.setValue(newVal);
      this.to['config'].columns = newVal;
    }
  }
  async onSelect(event: any) {
    if (this.to['onSelect']) {
      await this.to['onSelect'](event);
    }
  }
}
