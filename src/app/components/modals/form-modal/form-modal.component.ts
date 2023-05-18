import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private coreService: CoreService
  ) {}

  @Input() item: any = null;
  @Output() onFormIntial: any = new EventEmitter<string>();;
  form: any = new FormGroup({});
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};

  model: any;

  ngOnInit(): void {
    this.model = structuredClone(this.item.model);
    this.setForm();
  }

  setForm() {
    let field = this.item.fieldGroup;
    this.fields = this.coreService.services.form.getFormField(field);

   
  }

  async onSubmit(value: any): Promise<void> {
    if (this.form.valid) {
      if (this.item.tempID)
        if (!value[this.item.tempID]) value[this.item.tempID] = UUID.UUID();
      const resp = await this.item.onSubmit(structuredClone(value));

      if (resp.code == 200) {
        this.coreService.services.modal.close(structuredClone(value));
        this.discard();
      } else {
        this.coreService.services.form.validateError(resp, this.form);
      }
    }
  }

  async close() {
    this.coreService.services.modal.close(null, this.modalService.config.id);
    try {
      this.discard();
    } catch (error) {}
  }

  discard() {
    this.options.resetModel && this.options.resetModel();
  }

  modelChange(event: any) {
    if (this.item.modelChange) this.item.modelChange(event);
  }
}
