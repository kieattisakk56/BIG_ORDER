import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Observer } from 'rxjs';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class DatatableComponent implements OnInit {
  @ViewChild('table', { static: true }) table: DatatableComponent | undefined;
  @Input() config: DatableConfig | any;
  @Input() selectable: boolean = false;
  @Input() selectClass: any = '';
  @Output() ChangePage = new EventEmitter<string>();
  @Output() OnDrop = new EventEmitter<string>();
  @Output() onSelect = new EventEmitter<SelectedItemResponse>();
  dropdowmPos: any;
  loading!: loadingDTO;
  typeImage = Image;

  _column = [];

  pageSize: number | undefined;
  sizeList = [10, 20, 50, 100];

  isCheckAll: 0 | 1 | 2 = 0; // not check | check all | check some
  selectedItem: any[] = [];

  constructor(private coreService: CoreService) {
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }

  ngOnInit(): void {
    this.pageSize = this.config.paging.pageSize;
    if (this.config.paging.sizeList)
      this.sizeList = this.config.paging.sizeList;
    this._column = this.config.columns;
  }

  ngDoCheck(): void {
    const column = this.config.columns;
    if (this._column != column) {
      this.isCheckAll = 0;
      this.selectedItem = [];
      this._column = column;
      this.onSelect.emit({ items: [] });
    }
  }

  async sort(prop: any) {
    if (prop != this.config.sort.prop) {
      await this.sort_desc(prop);
    } else if (prop == this.config.sort.prop && this.config.sort.dir == 'asc') {
      await this.sort_desc(prop);
    } else if (
      prop == this.config.sort.prop &&
      this.config.sort.dir == 'desc'
    ) {
      await this.sort_asc(prop);
    }
    this.config.paging.page = 1;
    this.ChangePage.emit(this.config);
  }

  async sort_asc(prop: any) {
    this.config.sort = {
      dir: 'asc',
      prop: prop,
    };
    return null;
  }

  async sort_desc(prop: any) {
    this.config.sort = {
      dir: 'desc',
      prop: prop,
    };

    return null;
  }

  async change(event: any) {
    this.config.paging.page = event.page;
    this.ChangePage.emit(this.config);
  }

  async changePageSize(event: any) {
    this.config.paging.pageSize = event;
    this.ChangePage.emit(this.config);
  }

  async droupdownClick(col: any, prop: any, index: any) {
    this.config.columns.forEach((element: any) => {
      element.pos = '';
      element.class = '';
    });
    if (this.dropdowmPos?.id == `${prop}_${index}`) {
      this.dropdowmPos = {};
      return;
    }
    this.dropdowmPos = {};
    this.dropdowmPos.class = '';
    const doc = document.getElementById(`${prop}_${index}`) as HTMLElement;
    const pos = doc.getBoundingClientRect();
    col.pos = `top:${pos.top + 40}px !important;left:${pos.right - 100
      }px !important`;
    col.class = `show`;
    // col.id = `${prop}_${index}`;
    this.dropdowmPos = {
      id: `${prop}_${index}`,
    };
  }

  async eventClick(item: any, item2: any) {
    if (item.onClick) {
      item.onClick(item2);
      this.config.columns.forEach((element: any) => {
        element.pos = '';
        element.class = '';
      });
      this.dropdowmPos = {};
    }
  }

  checkAll() {
    this.selectedItem = [];

    if (this.isCheckAll == 2) {
      this.isCheckAll = 1;
    } else if (this.isCheckAll == 1) {
      this.isCheckAll = 0;
    } else {
      this.isCheckAll = 1;
    }
    if (this.isCheckAll == 1) {
      this.config.columns.forEach((element: any) => {
        this.selectedItem.push(element);
      });
    }
    this.onSelect.emit({ items: this.selectedItem });
  }

  checkItem(item: any) {
    if (this.selectedItem.includes(item)) {
      const index = this.selectedItem.findIndex((e) => e === item);
      this.selectedItem.splice(index, 1);
    } else {
      this.selectedItem.push(item);
    }
    if (this.selectedItem.length == this.config.columns.length) {
      this.isCheckAll = 1;
    } else if (this.selectedItem.length == 0) {
      this.isCheckAll = 0;
    } else {
      this.isCheckAll = 2;
    }
    this.onSelect.emit({ items: this.selectedItem, item: item });
  }

  getType(data: any) {
    return typeof data;
  }

  drop(event: any) {
    this.OnDrop.emit(event);
  }

  clickMenu(action: any, item: any) {
    this.clearDropdown();
    if (action) {
      action(item);
    }
  }

  @HostListener('document:click', ['$event.target'])
  clickedOut(event: any) {
    if (!event.parentElement?.className.includes('btn-droupdown')) {
      this.clearDropdown();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (this.dropdowmPos?.id) {
      const doc = document.getElementById(
        `${this.dropdowmPos.id}`
      ) as HTMLElement;
      const pos = doc.getBoundingClientRect();
      this.config.columns.forEach((resp: any) => {
        resp.pos = `top:${pos.top + 40}px !important;left:${pos.right - 100
          }px !important`;
      });
    }
  }

  clearDropdown() {
    if (this.config?.columns) {
      this.config?.columns.forEach((element: any) => {
        element.pos = '';
        element.class = '';
      });
      this.dropdowmPos = {};
    }

  }
}

export interface DatableConfig {
  idProp?: string;
  uid?: string;
  class?: string;
  headers: any[];
  columns: any[];
  draggable?: boolean;
  showPaging?: boolean;
  sort: {
    prop: any;
    dir: any;
  };
  paging: {
    page: any;
    pageSize: any;
    total: any;
    search: string;
    sizeList?: number[];
  };
}
export interface HeaderConfig {
  prop: string;
  name: string;
  type?: any;
  action: ActionConfig[];
}

export interface ActionConfig {
  prop: string;
  name: string;
  templateRef?: Component;
  onClick?: Observer<any>;
}

export interface SelectedItemResponse {
  items: any[];
  item?: any;
}
