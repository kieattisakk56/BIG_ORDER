import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { orderingFeature } from 'src/app/core/states/ordering/ordering.reducer';

@Component({
  selector: 'app-menu-confirm-modal',
  templateUrl: './menu-confirm-modal.component.html',
  styleUrls: ['./menu-confirm-modal.component.scss']
})
export class MenuConfirmModalComponent implements OnInit {
  @Input() item: any = null;
  model$ = this.store.select(orderingFeature.selectMenus)
  constructor(private store: Store) { }

  ngOnInit(): void {
  }
  async onSubmit(): Promise<void> {
    const resp = await this.item.onSubmit();

  }



  async onCancel() {
    await this.item.onCancel();
  }
}



