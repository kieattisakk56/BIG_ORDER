import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-select',
  templateUrl: './formly-field-select.component.html',
  styleUrls: ['./formly-field-select.component.scss'],
})
export class FormlyFieldSelectComponent extends FieldType<FieldTypeConfig> {
  data: any[] = [];
  selectedItem: any[] = [];
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
  is_reset = false;
  async ngOnInit() {

    if (this.to['optionsAsync']) {

      const params = {
        id: this.formControl.value,
        name: this.to['defaultValue']
      }
      const data = await this.to['optionsAsync'](params);
      this.data = data;
    } else if (this.to['options']) {
      this.data = [];
      this.to['options']?.forEach((element) => {
        this.data.push(element);
      });
    }
    if (this.to['defaultOption']) {
      if (this.model[this.to['defaultOption']['prop']]) {
        this.data.push({
          id: this.model[this.to['defaultOption']['prop']][this.to['defaultOption']['id']].toString(),
          name: this.model[this.to['defaultOption']['prop']][this.to['defaultOption']['name']],
          disabled: false,
        });
      }
    }

    if (this.formControl.value) {
      this.value = this.formControl.value.toString();
      if (this.value) {
        if (this.isStringAllNumbers(this.value)) {
          const object = this.data.find((resp: any) => { return resp.id == this.value });
          this.form.addControl(`${this.key}_description`, new FormControl(`${this.key}_description`));
          this.model[`${this.key}_description`] = object?.name;
          this.model[`${this.key}`] = Number(object?.id);
          this.formControl.setValue(object?.id)

        } else if (
          this.value.toLowerCase() == 'true' ||
          this.value.toLowerCase() == 'false'
        ) {
          this.model[`${this.key}`] = this.value.toLowerCase() == 'true';
        } else {
          ///    this.model[`${this.key}`] = this.value;
        }

      }
    }

    if (this.to['multiple']) {
      this.selectedItem = this.value.map((e: any) =>
        this.data.find((d) => d.id == e)
      );
    }

    this.searchUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(async (value: any) => {
        if (value.srcElement.value.length > 2) {
          if (!this.to['isRelation']) {
            const params = {
              id: this.formControl.value,
              name: value.srcElement.value
            }

            const data = await this.to['optionsAsync'](params);
            this.data = data;
            if (this.formControl.value) {

              this.value = this.formControl.value;
              this.formControl.setValue(this.value);

            }


            if (this.to['multiple']) {
              this.selectedItem = this.value.map((e: any) =>
                this.data.find((d) => d.id == e)
              );
            }
          }

        }

      });

    // setTimeout(() => {
    //   if (this.isStringAllNumbers(this.value)) {
    //     this.model[`${this.key}`] = Number(this.value);
    //   }
    // }, 600);

    this.coreService.services.events.subscribe(`update_option_${this.key}`, res => {
      this.data = res;
    })
  }


  async onChange(value: any) {
    value = value.toString();

    if (this.isStringAllNumbers(value)) {
      this.model[`${this.key}`] = value;
    } else if (
      value.toString().toLowerCase() == 'true' ||
      value.toLowerCase() == 'false'
    ) {
      this.model[`${this.key}`] = value.toLowerCase() == 'true';
    } else {
      this.model[`${this.key}`] = value;
    }


    const object = this.data.find((resp: any) => { return resp.id == value });

    this.form.addControl(`${this.key}_description`, new FormControl(`${this.key}_description`));
    this.model[`${this.key}_description`] = object?.name;
    this.form.controls[`${this.key}_description`].setValue(object?.name)
    this.selectedItem = [...value].map((e: any) => {
      this.data.find((d) => d.id == e)
    });
  }

  async onSelectOpen() {

    if (this.to['isRelation']) {
      this.data = [];
      if (this.to['optionsAsync']) {
        const data = await this.to['optionsAsync']();
        this.data = data;

        this.value = this.formControl.value;
        this.formControl.setValue(this.value);

        if (this.to['multiple']) {
          this.selectedItem = this.value.map((e: any) =>
            this.data.find((d) => d.id == e)
          );
        }
      }

    }

  }

  addOptions(option: string) {
    return option;
  }

  remove(item: any) {
    this.onChange(
      this.selectedItem.filter((e) => e.id != item.id).map((e) => e.id)
    );
  }

  // async onOpen() {
  //   this.coreService.services.loading.setShowLoad(false);
  //   const resp = await this.coreService.https.Employee.getDropDown()
  //   this.data = resp.data;
  // }

  isStringAllNumbers(inputString: string) {
    const regex = /^[0-9]+$/;
    return regex.test(inputString);
  }
}
