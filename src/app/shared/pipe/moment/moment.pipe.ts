import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { CoreService } from 'src/app/core/core.service';

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  constructor(private coreService: CoreService) {}

  transform(value: any): unknown {
    let date = new Date();
    if (typeof value == 'object') {
      date = value;
    } else {
      date = this.coreService.services.form.getStringtoDateTime(value);
    }
    const diff = moment().diff(date);
    if (diff > 86400000) {
      // 24 hours
      return moment(moment(date).format('D/M/yyyy')).calendar();
    }
    return moment(date).fromNow();
  }
}
