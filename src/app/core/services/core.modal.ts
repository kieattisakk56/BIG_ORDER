import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, observable } from 'rxjs';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root',
})
export class CoreModalService {
  private ch = '';
  id: any = [];
  constructor(
    private modalService: BsModalService,
    private coreService: CoreService
  ) { }

  // async open(config?: ModalsConfigs) {

  //     return Observable.create((observer: any) => {
  //         this.ch = config?.component;
  //         const initialState = {
  //             item: config?.data
  //         };
  //         this.modalService.show(config?.component, {
  //             initialState,
  //             backdrop: "static",
  //             keyboard: false,
  //             ...config?.config
  //         });
  //         this.modalService.getModalsCount();
  //         this.coreService.services.events.subscribe(config?.component, res => {
  //             observer.next(res)
  //             observer.complete();
  //         })
  //     });
  // }
  async open(config?: ModalsConfigs) {
    this.ch = config?.component;
    const initialState = {
      item: config?.data,

    };
    var uId = UUID.UUID();
    this.id.push(uId)
    this.modalService.show(config?.component, {
      initialState,
      backdrop: 'static',
      keyboard: false,
      animated: true,
      id: uId,
      ...config?.config,
    });

    return Observable.create((observer: any) => {
      this.modalService.getModalsCount();
      this.coreService.services.events.subscribe(config?.component, (res) => {
        observer.next(res);
        observer.complete();
      });
    });
  }

  async close(data?: any, id: any = undefined) {
    
    this.modalService.hide(this.id[this.id.length - 1]);
    this.coreService.services.events.publish(this.ch, data);
    this.coreService.services.events.unsubscribe(this.ch);
    this.id.pop();
  }
}
export interface ModalsConfigs {
  component: any;
  data: any;
  config: any;
}
