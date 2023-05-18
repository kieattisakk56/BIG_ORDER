import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FieldArrayType, FieldType, FieldTypeConfig, FormlyFormBuilder } from '@ngx-formly/core';
import { mode } from 'crypto-js';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-formly-field-nested-form',
  templateUrl: './formly-field-nested-form.component.html',
  styleUrls: ['./formly-field-nested-form.component.scss'],
})
export class FormlyFieldNestedFormComponent extends FieldArrayType {
  constructor(private fb: FormBuilder, private coreService: CoreService) {
    super();
  }

  label = '';
  editableField: string[] = [];
  is_delete = false;
  async ngOnInit(): Promise<void> {

    if (this.field.templateOptions) {
      this.label = this.field.templateOptions['label'] || this.label;
      this.editableField = this.field.templateOptions['editableField'] || this.editableField
    }

    this.fetctDelete();

    this.form.valueChanges.subscribe(res => {
      this.fetctDelete();
    });
  }

  edit(index: number) {
    if (!this.field.fieldGroup) return;
    let item = this.field.fieldGroup[index];
    const fieldGroup = item.fieldGroup;
    if (!fieldGroup) return;
    fieldGroup.forEach((field: any) => {
      const key = field.key;
      if (this.editableField.includes(key)) {
        field.templateOptions.disabled = !field.templateOptions.disabled;
      }
    });

  }

  async addData() {

    this.add();
    // if (this.to['onAdd']) {
    //   await this.to['onAdd']();
    // }
    this.fetctDelete();
  }

  async removeData(index: number) {

    // Set value here when field is removed
    const values = structuredClone(this.formControl.value);
    values[index].is_delete = true;

    this.formControl.setValue(values);
    this.fetctDelete();
  }

  async fetctDelete() {
    this.is_delete = this.model.filter((res: any) => { return res.is_delete == false }).length == 0;
  }

}
