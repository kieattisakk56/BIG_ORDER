import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class CoreDatetimeService {

  constructor() {

  }
  public get(datatime: any) {
    return moment(datatime).format('DD/MM/YYYY HH:mm');
  }
}
