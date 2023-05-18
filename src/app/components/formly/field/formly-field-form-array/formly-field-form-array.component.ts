import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { DatableConfig } from 'src/app/components/datatable/datatable.component';
import { FormModalComponent } from 'src/app/components/modals/form-modal/form-modal.component';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-formly-field-form-array',
  templateUrl: './formly-field-form-array.component.html',
  styleUrls: ['./formly-field-form-array.component.scss'],
})
export class FormlyFieldFormArrayComponent extends FieldType<FieldTypeConfig> {
  constructor(
    private coreService: CoreService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  tempID = UUID.UUID() + 'tempID';

  displayValue = [];

  search: any;
  searchUpdate = new Subject<string>();
  params = {
    keyword: '',
    column: '',
    orderBy: 'asc',
    page: 1,
    pageSize: 10,
  };

  config: DatableConfig = {
    headers: [
      {
        prop: '',
        name: '',
        type: 'Action',
        sortable: false,
        actions: [
          {
            prop: {
              click: (item: any) => this.edit(item),
            },
            name: 'Edit',
          },
          {
            prop: {
              click: (item: any) => this.delete(item),
              hide: (item: any) =>
                this.field.templateOptions['deleteable'] == undefined
                  ? false
                  : !this.field.templateOptions['deleteable'],
            },
            name: 'Delete',
          },
        ],
      },
    ],
    columns: [],
    sort: { prop: this.params.column, dir: this.params.orderBy },
    paging: {
      page: this.params.page,
      pageSize: this.params.pageSize,
      total: 0,
      search: this.params.keyword,
    },
  };

  ngOnInit(): void {
    this.searchUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value: any) => {
        this.coreService.services.events.publish('search_table', value);
      });

    this.coreService.services.events.subscribe('search_table', (res) => {
      this.config.paging.search = res;
      this.config.paging.page = 1;
      this.getDisplayValue();
    });
    const to = this.field.templateOptions;
    if (to['params']) {
      this.params = { ...this.params, ...to['params'] };
      this.config.sort = { prop: this.params.column, dir: this.params.orderBy };
      this.config.paging = {
        page: this.params.page,
        pageSize: this.params.pageSize,
        total: 0,
        search: this.params.keyword,
      };
    }
    if (to['config'].headers) {
      this.config.headers = [...to['config'].headers, ...this.config.headers];
    }
    this.formControl.value.forEach((e: any) => {
      if (!e[this.tempID]) {
        e[this.tempID] = UUID.UUID();
      }
    });
    this.getDisplayValue();
  }

  openModal(model?: any) {
    this.coreService.services.modal.open({
      component: FormModalComponent,
      data: {
        fieldGroup: [Object.assign({}, this.field.fieldArray)],
        model: model || this.field.templateOptions['model'],
        templateOptions: this.field.templateOptions,
        tempID: this.tempID,
      },
      config: {
        backdrop: 'static',
        keyboard: false,
        class: this.field.templateOptions['modalClass'] || 'modal-md',
      },
    });

    this.coreService.services.events.subscribe(
      FormModalComponent.toString(),
      (e: any) => {
        if (!e) return;
        if (!e[this.tempID]) {
          e[this.tempID] = UUID.UUID();
        }
        if (this.formControl.value) {
          const index = this.formControl.value.findIndex(
            (a: any) => a[this.tempID] == e[this.tempID]
          );
          if (index != -1) {
            const data = structuredClone(this.formControl.value);
            data[index] = e;
            this.formControl.setValue(data);
          } else {
            this.formControl.setValue([...this.formControl.value, e]);
          }
        } else {
          this.formControl.setValue([e]);
        }
        this.getDisplayValue();
      }
    );
  }

  async change(event: any) {
    this.config = event;
    this.getDisplayValue();
  }

  getDisplayValue() {
    const total = this.formControl.value.length;
    const page = this.config.paging.page;
    const pageSize = this.config.paging.pageSize;
    const startIndex = (page - 1) * pageSize;
    const displaySize = pageSize;
    const prop = this.config.sort.prop;
    const dir = this.config.sort.dir == 'asc' ? 1 : -1;
    const deleteProp = this.to['deleteProp'];
    this.displayValue = structuredClone(
      this.formControl.value.filter((e: any) => !e[deleteProp])
    );
    if (prop && dir) {
      this.displayValue.sort((a, b) => (a[prop] > b[prop] ? dir : dir * -1));
    }
    this.displayValue = this.displayValue.splice(startIndex, displaySize);
    this.config.columns = this.displayValue;
    this.config.paging.total = total;
  }

  edit(item: any) {
    this.openModal(item);
  }

  async delete(item: any) {
    const confirm = await this.coreService.services.alert.confirm(
      `คุณต้องการที่ลบ`
    );
    if (confirm) {
      const deleteProp = this.to['deleteProp'];
      const idProp = this.to['idProp'];
      const newValue = this.formControl.value.filter(
        (e: any) => e[this.tempID] != item[this.tempID] || e[idProp]
      );
      const index = newValue.findIndex(
        (e: any) => e[this.tempID] == item[this.tempID]
      );
      if (index != -1) {
        newValue[index][deleteProp] = true;
      }
      this.formControl.setValue(newValue);
      this.getDisplayValue();
    }
  }

  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
