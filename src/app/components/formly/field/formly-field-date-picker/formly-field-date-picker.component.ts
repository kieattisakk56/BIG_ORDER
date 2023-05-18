import { Component, OnInit } from '@angular/core';
import { s } from '@fullcalendar/core/internal-common';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { BsDatepickerConfig, BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';
import * as moment from 'moment';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'formly-field-date-picker',
  templateUrl: './formly-field-date-picker.component.html',
  styleUrls: ['./formly-field-date-picker.component.scss'],
})
export class FormlyFieldDatePickerComponent extends FieldType<FieldTypeConfig> {

  config: any = {
    dateInputFormat: "DD/MM/YYYY",
    containerClass: 'theme-default',
    showWeekNumbers: false,
    isAnimated: true,

    rangeInputFormat: 'DD/MM/YYYY',


  }
  selectedDates: any;
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() {
  }


  modelValueAsDate: Date = new Date();
  loading!: loadingDTO;

  onDateSelected(date: Date) {
    console.log(this.selectedDates)
  }
  onChange(event: any) { }

  // onOpenCalendar(container: any) {
  //   if (this.to["format"] == 'year') {
  //     container.yearSelectHandler = (event: any): void => {

  //       container._store.dispatch(container._actions.select(event.date));
  //       this.formControl.setValue(moment(event.date).format('YYYY'))
  //     };
  //     this.config.dateInputFormat = 'YYYY'
  //     container.setViewMode('year');

  //   }
  // }


}
