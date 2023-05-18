import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CropImageComponent } from 'src/app/components/modals/crop-image/crop-image.component';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root',
})
export class CoreCropService {
  private ch = '';
  file = null;
  image: any;
  input: HTMLInputElement = document.createElement('input');
  modalSucessConfig: any = {
    data: { file: null, image: '' },
    component: CropImageComponent,
    config: {
      class: 'modal-lg',
    },
  };

  constructor(
    private coreService: CoreService,
    private modalService: BsModalService
  ) {}

  async browseImage() {
    this.input = document.createElement('input');
    this.input.type = 'file';
    this.input.style.display = 'none';
    this.input.accept = 'image/*';
    document.body.appendChild(this.input);
    this.input.click();
    this.input.addEventListener('change', (e) => {
      this.processFile(e);
    });
    return Observable.create((observer: any) => {
      this.coreService.services.events.subscribe('browse', (res) => {
        document.body.removeChild(this.input);
        observer.next(res);
        observer.complete();
      });
    });
  }

  async processFile(event: any) {
    this.file = event.target.files[0];
    const modal = await this.cropImage({
      file: this.file,
    });
    modal.subscribe((res: any) => {
      this.cropImage().then(async (e) => {});
    });
  }

  async cropImage(item?: CropConfigs, options?: CropOptions) {
    return Observable.create((observer: any) => {
      const initialState = {
        item: item,
        options: options,
      };
      this.modalService.show(CropImageComponent, {
        initialState,
        backdrop: 'static',
        keyboard: false,
        class: 'modal-lg',
        id: 'md-crop',
      });
      this.modalService.getModalsCount();
      this.coreService.services.events.subscribe('crop', (res) => {
        observer.next(res);
        observer.complete();
      });
    });
  }

  async close(data?: any) {
    this.modalService.hide('md-crop');
    this.coreService.services.events.publish('browse', data);
    this.coreService.services.events.unsubscribe('browse');
    this.coreService.services.events.publish('crop', data);
    this.coreService.services.events.unsubscribe('crop');
  }

  toBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => (this.image = reader.result);
      reader.onerror = (error) => reject(error);
    });
}

export interface CropConfigs {
  file?: any;
  image64?: any;
  imageUrl?: any;
}

export interface CropOptions {
  aspectRatio?: number;
  maintainAspectRatio?: boolean;
  cropperMinWidth?: number;
  cropperMinHeight?: number;
  cropperMaxWidth?: number;
  cropperMaxHeight?: number;
}
