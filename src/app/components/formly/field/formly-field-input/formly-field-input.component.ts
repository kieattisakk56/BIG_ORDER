import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-input',
  templateUrl: './formly-field-input.component.html',
  styleUrls: ['./formly-field-input.component.scss'],
})
export class FormlyFieldInputComponent extends FieldType<FieldTypeConfig> {


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
  loading!: loadingDTO;
}
