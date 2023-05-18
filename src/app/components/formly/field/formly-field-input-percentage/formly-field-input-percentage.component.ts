import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-input-percentage',
  templateUrl: './formly-field-input-percentage.component.html',
  styleUrls: ['./formly-field-input-percentage.component.scss']
})
export class FormlyFieldInputPercentageComponent extends FieldType<FieldTypeConfig> {

  loading!: loadingDTO;
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() {
  }
  
}
