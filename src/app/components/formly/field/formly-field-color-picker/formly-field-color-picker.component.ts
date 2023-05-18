import { Component, HostListener, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-color-picker',
  templateUrl: './formly-field-color-picker.component.html',
  styleUrls: ['./formly-field-color-picker.component.scss'],
})
export class FormlyFieldColorPickerComponent extends FieldType<FieldTypeConfig> {
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() {
  }

  loading!: loadingDTO;
  show = false;
  uid = UUID.UUID();

  ngOnInit(): void {
    if (!this.formControl.value) {
      this.formControl.setValue('#ffffff');
    }
  }

  @HostListener('document:click', ['$event.target'])
  clickedOut(event: any) {
    const parentEle = document.getElementById(this.uid);
    const childEle = event.parentElement;
    if (parentEle != childEle && !parentEle?.contains(childEle)) {
      this.show = false;
    }
  }

  changeComplete(event: any) {
    const hex = this.coreService.services.utility.RGBAToHexA(
      event.color.rgb.r,
      event.color.rgb.g,
      event.color.rgb.b,
      event.color.rgb.a
    );
    this.formControl.setValue(hex);
  }

  showPicker() {
    this.show = !this.show;
  }
}
