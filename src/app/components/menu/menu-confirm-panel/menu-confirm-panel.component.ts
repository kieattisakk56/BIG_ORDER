import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreService } from 'src/app/core/core.service';

import { orderingFeature } from 'src/app/core/states/ordering/ordering.reducer';
import { MenuConfirmModalComponent } from '../menu-confirm-modal/menu-confirm-modal.component';
import { orderingAction } from 'src/app/core/states/ordering/ordering.actions';
import { OrderHistoryModalComponent } from '../order-history-modal/order-history-modal.component';

@Component({
  selector: 'app-menu-confirm-panel',
  templateUrl: './menu-confirm-panel.component.html',
  styleUrls: ['./menu-confirm-panel.component.scss']
})
export class MenuConfirmPanelComponent implements OnInit {
  model$ = this.store.select(orderingFeature.selectCount);
  @Output() onSend: any = new EventEmitter<string>();
  constructor(private store: Store, private core: CoreService) { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.core.services.modal.open({
      component: MenuConfirmModalComponent,
      data: {
        onSubmit: async (value: any) => {
          this.core.services.modal.close();
          this.onSend.emit();
        },
        onCancel: async (value: any) => {
          this.core.services.modal.close();
        },
      },
      config: {
        backdrop: 'static',
        keyboard: false,
        class: 'modal-fullscreen',
      },
    });
  }

  onSubmit(body: any) {

  }

  onClickHistory() {
    this.core.services.modal.open({
      component: OrderHistoryModalComponent,
      data: {
        onSubmit: async (value: any) => {
          this.core.services.modal.close();
          this.onSend.emit();
        },
        onCancel: async (value: any) => {
          this.core.services.modal.close();
        },
      },
      config: {
        backdrop: 'static',
        keyboard: false,
        class: 'modal-fullscreen',
      },
    });
  }
}
