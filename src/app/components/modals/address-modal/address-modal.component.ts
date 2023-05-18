import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
})
export class AddressModalComponent implements OnInit {
  @Input() item: any = null;
  address = '';

  constructor(
    private coreService: CoreService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.address = this.item.Address;
  }

  async close() {
    this.modalService.hide();
    this.coreService.services.events.publish('address', {
      close: true,
    });
    this.coreService.services.events.unsubscribe('address');
  }
}
