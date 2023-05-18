import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-order-history-modal',
  templateUrl: './order-history-modal.component.html',
  styleUrls: ['./order-history-modal.component.scss']
})
export class OrderHistoryModalComponent implements OnInit {
  items: any = [];
  constructor(private core: CoreService) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.core.services.modal.close();
  }
}
