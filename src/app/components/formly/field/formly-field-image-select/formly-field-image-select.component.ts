import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-select',
  templateUrl: './formly-field-image-select.component.html',
  styleUrls: ['./formly-field-image-select.component.scss'],
})
export class FormlyFieldImageSelectComponent extends FieldType<FieldTypeConfig> {
  data: any[] = [];
  value: any;
  guid = UUID.UUID();
  
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() {
  }
  loading!: loadingDTO;

  async ngOnInit() {
    // if (this.to['optionsAsync']) {
    //   const data = await this.to['optionsAsync']();
    //   this.data = data;
    // } else 
    if (this.to['options']) {
      this.data = [];
      this.to['options']?.forEach((element) => {
        this.data.push(element);
      });
    }

    if (this.formControl.value) {
      this.value = this.formControl.value;
      if (this.data.length == 0) {
        this.value.forEach((e: any) => {
          if (!this.data.find((x) => x.id == e))
            this.data.push({
              id: e,
              name: e,
              disabled: false,
            });
        });
      }
    }
  }

  change(value: any) {
    this.formControl.setValue(value);
  }

  addOptions(option: string) {
    return option;
  }

  // async onOpen() {
  //   this.coreService.services.loading.setShowLoad(false);
  //   const resp = await this.coreService.https.Employee.getDropDown()
  //   this.data = resp.data;
  // }
}
