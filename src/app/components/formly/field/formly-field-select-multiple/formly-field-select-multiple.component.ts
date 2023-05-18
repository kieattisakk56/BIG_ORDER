import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-select-multiple',
  templateUrl: './formly-field-select-multiple.component.html',
  styleUrls: ['./formly-field-select-multiple.component.scss']
})
export class FormlyFieldSelectMultipleComponent extends FieldType<FieldTypeConfig> {

  data: any[] = [];
  selectedItems: any[] = [];
  previewitems: any[] = [];
  value: any;
  text = '';
  searchUpdate = new Subject<any>();
  selectName = '';
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() { }
  loading!: loadingDTO;
  onchange: any;
  onsearch = false;
  items: any = [];

  async ngOnInit() {

    this.previewitems = this.formControl.value;

    this.searchUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(async (value: any) => {
        const params = {
          id: this.formControl.value,
          name: value.srcElement.value
        }
        const data = await this.to['optionsAsync'](params);
        this.items = data;

      })
    this.formControl.valueChanges.subscribe((data: any) => {
      console.log(data);
    })
  }


  async onChange(event: any) {
    const data = this.selectedItems[this.selectedItems.length - 1];
    const index = this.previewitems.findIndex(item => {
      return item.id == data.id
    })

    if (index == -1) {
      this.previewitems = [...this.previewitems, data];
    } else {
      this.coreService.services.toast.error('ข้อมูลมีอยู่แล้ว');
    }

    this.form.setValue(this.previewitems);
    this.items = [];
  }



  onRemove(item: any) {
    const index = this.previewitems.indexOf(item);
    if (index !== -1) {
      this.items = [];
      this.previewitems.splice(index, 1);
      this.form.setValue(this.previewitems);
    }
  }


  isStringAllNumbers(inputString: string) {
    const regex = /^[0-9]+$/;
    return regex.test(inputString);
  }

}
