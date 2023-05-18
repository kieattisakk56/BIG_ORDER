import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreService } from 'src/app/core/core.service';

import { orderingFeature } from 'src/app/core/states/ordering/ordering.reducer';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent implements OnInit {
  @Input() menu: any;

  constructor(private core: CoreService) { }

  ngOnInit(): void {

  }

  onMinus(item: any) {
    if (item.value > 0) {
      item.value--;
    }
    this.core.services.ordering.update(item)
  }

  onAdd(item: any) {
    item.value++;
    this.core.services.ordering.update(item)
  }
}
