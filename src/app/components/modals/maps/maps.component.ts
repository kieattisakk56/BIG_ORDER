import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Loader } from '@googlemaps/js-api-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  @Input() data!: googleMapsData;

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild('actions')
  public actionsElementRef!: ElementRef;
  private map!: GoogleMap;

  @ViewChild('map') set content(content: GoogleMap) {
    if (content) {
      this.map = content;
      this.loadControl();
    }
  }

  isGoogleLoaded = false;

  zoom = 17;
  center: google.maps.LatLngLiteral = { lat: 13.7649136, lng: 100.5360959 };
  options: google.maps.MapOptions = { clickableIcons: false };

  multiple = false;
  required = false;

  notifyText = '';

  markers: googleMapsMarker[] = [];
  value: { lat: number; lng: number }[] = [];

  movingIndex: number = -1;

  constructor(
    private coreService: CoreService,
    private modalService: BsModalService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!this.data.center)
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
    });
    const loader = new Loader({
      apiKey: this.coreService.services.environment.environment.googleMapApiKey,
      libraries: ['places'],
    });
    loader.load().then(() => {
      this.isGoogleLoaded = true;
      this.initial();
    });
  }

  initial() {
    this.center = { ...this.center, ...this.data.center };
    this.zoom = this.data.zoom || this.zoom;
    this.options = { ...this.options, ...this.data.options };
    if (this.data.multiple != undefined) {
      this.multiple = this.data.multiple;
    }
    if (this.data.required != undefined) {
      this.required = this.data.required;
    }

    this.data.markers?.forEach((e) => {
      const lat = parseFloat(e.position.lat.toString());
      const lng = parseFloat(e.position.lng.toString());
      this.addValue(lat, lng);
    });
  }

  loadControl() {
    this.addSearchBox();
    this.addActions();
  }

  addSearchBox() {
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom

        const latitude = place.geometry.location?.lat() || 0;
        const longitude = place.geometry.location?.lng() || 0;
        this.addValue(latitude, longitude);
        this.center = {
          lat: latitude,
          lng: longitude,
        };
      });
    });
  }

  addActions() {
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.actionsElementRef.nativeElement
    );
  }

  close() {
    this.modalService.hide('maps');
    this.coreService.services.events.unsubscribe('maps');
  }

  save() {
    const data = this.value;
    let pass = this.notify();
    if (pass) {
      this.modalService.hide('maps');
      this.coreService.services.events.publish('maps', data);
      this.coreService.services.events.unsubscribe('maps');
    }
  }

  mapClick(event: google.maps.MapMouseEvent) {
    this.addValue(event.latLng?.lat() || 0, event.latLng?.lng() || 0);
  }

  markerClick(event: google.maps.MapMouseEvent) {
    this.removeValue(event.latLng?.lat() || 0, event.latLng?.lng() || 0);
  }

  markerDrag(event: google.maps.MapMouseEvent) {}

  markerDragStart(event: google.maps.MapMouseEvent) {
    this.movingIndex = this.getValueIndex(
      event.latLng?.lat() || 0,
      event.latLng?.lng() || 0
    );
  }

  markerDragEnd(event: google.maps.MapMouseEvent) {
    const value = {
      lat: event.latLng?.lat() || 0,
      lng: event.latLng?.lng() || 0,
    };
    this.changeValue(this.movingIndex, value);
  }

  addValue(lat: number, lng: number) {
    if (!this.multiple) {
      this.value = [];
      this.markers = [];
    }
    const coor = {
      lat,
      lng,
    };
    this.value.push(coor);
    this.markers.push({
      position: coor,
      options: {
        draggable: true,
      },
    });
    this.notify();
  }

  removeValue(lat: number, lng: number) {
    const index = this.getValueIndex(lat, lng);
    this.value.splice(index, 1);
    this.markers.splice(index, 1);

    this.notify();
  }

  changeValue(index: number, value: { lat: number; lng: number }) {
    this.value[index] = value;
  }

  getValueIndex(lat: number, lng: number) {
    return this.value.findIndex((e) => e.lat == lat && e.lng == lng);
  }

  notify() {
    let pass = false;
    const data = this.value;
    this.notifyText = '';
    if (this.required) {
      if (this.multiple) {
        if (data.length == 0) {
          this.notifyText = 'Select at least 1 coordinates.';
        } else {
          pass = true;
        }
      } else {
        if (!data[0]) {
          this.notifyText = 'Select 1 coordinates.';
        } else {
          pass = true;
        }
      }
    }
    return true;
  }
}

export interface googleMapsData {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  options?: google.maps.MapOptions;
  markers?: googleMapsMarker[];
  multiple?: boolean;
  required?: boolean;
}

export interface googleMapsMarker {
  title?: string;
  position: google.maps.LatLngLiteral;
  label?: string | google.maps.MarkerLabel;
  clickable?: boolean;
  options?: google.maps.MarkerOptions;
  icon?: string | google.maps.Icon | google.maps.Symbol;
  visible?: boolean;
}
