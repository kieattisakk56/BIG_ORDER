import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-checkbox',
  templateUrl: './formly-field-checkbox.component.html',
  styleUrls: ['./formly-field-checkbox.component.scss'],
})
export class FormlyFieldCheckboxComponent extends FieldType<FieldTypeConfig> {
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() { }
  loading!: loadingDTO;
  data: any[] = [];

  async ngOnInit(): Promise<void> {

    if (this.to['optionsAsync']) {
      const data = await this.to['optionsAsync']();
      this.data = data;
    } else if (this.to['options']) {
      this.data = [];
      this.to['options']?.forEach((element) => {
        this.data.push(element);
      });
    }
  }

  guid = UUID.UUID();

  change(value: any, e: any) {
    this.formControl.setValue(e.target.checked);
  }
  
}
