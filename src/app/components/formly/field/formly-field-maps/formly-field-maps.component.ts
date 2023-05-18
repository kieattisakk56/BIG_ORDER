import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  googleMapsData,
  googleMapsMarker,
  MapsComponent,
} from 'src/app/components/modals/maps/maps.component';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formly-field-maps',
  templateUrl: './formly-field-maps.component.html',
  styleUrls: ['./formly-field-maps.component.scss'],
})
export class FormlyFieldMapsComponent extends FieldType<FieldTypeConfig> {
  loading!: loadingDTO;

  constructor(
    private coreService: CoreService,
    private modalService: BsModalService
  ) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }

  multiple = false;
  required = false;

  latFormControl!: any;
  lngFormControl!: any;

  ngOnInit(): void {
    if (this.to) {
      if (this.to['multiple'] != undefined) {
        this.multiple = this.to['multiple'];
      }
      if (this.to['required'] != undefined) {
        this.required = this.to['required'];
      }
      if (this.form) {
        this.latFormControl = this.form.controls[this.to['latModel']];
        this.lngFormControl = this.form.controls[this.to['lngModel']];
      }
    }
  }

  openMap = () => {
    const markers: googleMapsMarker[] = [];
    if (!this.multiple) {
      const lat = this.latFormControl.value;
      const lng = this.lngFormControl.value;
      if (lat && lng) {
        markers.push({
          position: {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          },
        });
      }
    }
    const initialState: { data: googleMapsData } = {
      data: {
        center: markers[0] ? markers[0].position : undefined,
        markers: markers,
        multiple: this.multiple,
        required: this.required,
      },
    };
    this.modalService.show(MapsComponent, {
      initialState,
      backdrop: 'static',
      keyboard: false,
      class: 'modal-xl',
      id: 'maps',
    });
    this.coreService.services.events.subscribe('maps', (res) => {
      this.submit(res);
    });
  };

  submit(value: { lat: number; lng: number }[]) {
    if (!this.multiple) {
      const newValue = value && value[0];
      if (newValue) {
        this.latFormControl.setValue(newValue.lat.toString());
        this.lngFormControl.setValue(newValue.lng.toString());
      } else {
        this.latFormControl.setValue('');
        this.lngFormControl.setValue('');
      }
    }
  }
}
