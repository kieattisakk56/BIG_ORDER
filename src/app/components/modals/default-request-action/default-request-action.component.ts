import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-default-request-action',
  templateUrl: './default-request-action.component.html',
  styleUrls: ['./default-request-action.component.scss']
})
export class DefaultRequestActionComponent implements OnInit {
  @Input() item: any = null;

  constructor(
    private coreService: CoreService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }

  async close() {
    this.coreService.services.modal.close(null, this.modalService.config.id);
    try {

    } catch (error) { }
  }

  copyText() {
    this.coreService.services.copy.copyText(this.item.templateOptions.action.copy);
    this.coreService.services.toast.success('คัดลอกเรียบร้อย');
    setTimeout(() => {
      this.close();
    }, 600);
  }

}
