import { Injectable, Injector } from '@angular/core';
import { CoreAlertService } from './services/core.alert';
import { CoreCopyService } from './services/core.coppy';
import { CoreCropService } from './services/core.crop';
import { CoreCryptoJSService } from './services/core.cryptojs';
import { CoreEnvironmentService } from './services/core.environment';
import { CoreEventsService } from './services/core.events';
import { CoreFormService } from './services/core.form';
import { CoreHttpService } from './services/core.http';
import { CoreLayoutService } from './services/core.layout';
import { CoreLoadingService } from './services/core.loading';
import { CoreMicrosoftAuthenService } from './services/core.microsoftauthen';
import { CoreModalService } from './services/core.modal';
import { CoreStorageService } from './services/core.storage';
import { CoreToastService } from './services/core.toast';
import { CoreUtilityService } from './services/core.utility';
import { CoreDatetimeService } from './services/core.datetime';
import { HashLocationStrategy } from '@angular/common';







import { CoreStatusService } from './services/core.status';
import { CoreOrderingService } from './services/core.ordering';
import { StoreService } from '../shared/services/store/store.service';


@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private injector: Injector) { }

  public get services() {
    return {
      storage: this.injector.get(CoreStorageService),
      crypto: this.injector.get(CoreCryptoJSService),
      copy: this.injector.get(CoreCopyService),
      alert: this.injector.get(CoreAlertService),
      events: this.injector.get(CoreEventsService),
      utility: this.injector.get(CoreUtilityService),
      http: this.injector.get(CoreHttpService),
      loading: this.injector.get(CoreLoadingService),
      toast: this.injector.get(CoreToastService),
      modal: this.injector.get(CoreModalService),
      crop: this.injector.get(CoreCropService),
      form: this.injector.get(CoreFormService),
      layout: this.injector.get(CoreLayoutService),
      microsoft_authen: this.injector.get(CoreMicrosoftAuthenService),
      environment: this.injector.get(CoreEnvironmentService),
      dateTime: this.injector.get(CoreDatetimeService),
      status: this.injector.get(CoreStatusService),
      ordering: this.injector.get(CoreOrderingService)
    };
  }

  public get https() {
    return {
      store: this.injector.get(StoreService)
    }

  }

  public get socket() {
    return {}
  }


}
