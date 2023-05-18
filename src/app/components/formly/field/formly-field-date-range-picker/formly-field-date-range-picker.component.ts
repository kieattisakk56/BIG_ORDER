import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-date-range-picker',
  templateUrl: './formly-field-date-range-picker.component.html',
  styleUrls: ['./formly-field-date-range-picker.component.scss'],
})
export class FormlyFieldDateRangePickerComponent extends FieldType<FieldTypeConfig> {
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() {
  }

  loading!: loadingDTO;

  onChange(event: any) {}
}
