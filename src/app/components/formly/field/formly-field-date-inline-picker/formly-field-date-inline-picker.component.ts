import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-date-inline-picker',
  templateUrl: './formly-field-date-inline-picker.component.html',
  styleUrls: ['./formly-field-date-inline-picker.component.scss']
})
export class FormlyFieldDateInlinePickerComponent extends FieldType<FieldTypeConfig> {

  dateSelected: any = [];
  selectedClass: any = [];

  getDateItem(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  onValueChange(event: any) {
    if (event.length === undefined) {
      const date = this.getDateItem(event);

      const index = this.dateSelected.findIndex((item: any) => {
        const testDate = this.getDateItem(item);
        return testDate === date;
      });

  

      if (index < 0) {
        this.dateSelected.push(event);
      }
      else {
        this.dateSelected.splice(index, 1);
      }
    }


    if (this.dateSelected.length > 0) {
      this.selectedClass = this.dateSelected.map((date: any) => {
        return {
          date,
          classes: ['custom-selected-date']
        }
      })
    }
    this.formControl.setValue(structuredClone(this.dateSelected))
  }

}
