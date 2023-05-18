import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-formly-field-full-calendar',
  templateUrl: './formly-field-full-calendar.component.html',
  styleUrls: ['./formly-field-full-calendar.component.scss']
})
export class FormlyFieldFullCalendarComponent  extends FieldType<FieldTypeConfig> implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOption!: CalendarOptions;
  loading!: loadingDTO;
  searchUpdate = new Subject<any>();
  
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
    
    this.searchUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(async (value: any) => {
        this.formControl.setValue(value.srcElement.value);

      });
  }

  ngOnInit(): void {
    this.calendarOption = this.to?.['calendarOption'];
  }

  ngAfterViewInit(): void {
    // setA
    this.gotoDate();
  }

  gotoDate() {
    let calendarApi = this.calendarComponent.getApi();
    const gotoDate = this.to?.['calendarOption']?.gotoDate;
    gotoDate && calendarApi.gotoDate(gotoDate);
  }

}
