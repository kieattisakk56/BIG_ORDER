import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-input-currency',
  templateUrl: './formly-field-input-currency.component.html',
  styleUrls: ['./formly-field-input-currency.component.scss']
})
export class FormlyFieldInputCurrencyComponent extends FieldType<FieldTypeConfig> {
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
  ngOnDestroy() {
  }

  keyup() {

  }
}
