import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-button',
  templateUrl: './formly-field-button.component.html',
  styleUrls: ['./formly-field-button.component.scss'],
})
export class FormlyFieldButtonComponent extends FieldType<FieldTypeConfig> {
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }

  loading!: loadingDTO;

  ngOnInit(): void { }

  async click() {
    if (this.to['click']) {
      if (this.to['typeButton'] == 'delete') {
        const resp: any = await this.to['click'](this.model ?? {});
        if (resp) {
          this.formControl.setValue(true);
        }
      } else {
        const resp: any = await this.to['click'](this.model ?? {});
        if (resp) {
          console.log(this.field)
          this.model = resp;
        }
      }

    }
  }
}
