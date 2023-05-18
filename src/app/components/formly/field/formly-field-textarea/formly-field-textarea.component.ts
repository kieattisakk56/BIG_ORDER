import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-textarea',
  templateUrl: './formly-field-textarea.component.html',
  styleUrls: ['./formly-field-textarea.component.scss'],
})
export class FormlyFieldTextareaComponent extends FieldType<FieldTypeConfig> {
  data: any;
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
    
 
  }
  ngOnDestroy() {
  }
  loading!: loadingDTO;
}
