import { Component, Input, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CoreService } from 'src/app/core/core.service';
import { CropConfigs, CropOptions } from 'src/app/core/services/core.crop';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss'],
})
export class CropImageComponent implements OnInit {
  @Input() item!: CropConfigs;
  @Input() options: CropOptions = {};
  croppedImage: any = '';
  scale = 1;
  ratio = 16 / 9;
  transform = {
    scale: this.scale,
    flipH: false,
    flipV: false,
  };
  maintainAspectRatio = false;
  cropperMinWidth = 0;
  cropperMinHeight = 0;
  cropperMaxWidth = 0;
  cropperMaxHeight = 0;

  width = 0;
  height = 0;

  constructor(private coreService: CoreService) {}

  ngOnInit(): void {
    this.ratio = this.options.aspectRatio || this.ratio;
    this.maintainAspectRatio =
      this.options.maintainAspectRatio || this.maintainAspectRatio;
    this.cropperMinWidth = this.options.cropperMinWidth || this.cropperMinWidth;
    this.cropperMinHeight =
      this.options.cropperMinHeight || this.cropperMinHeight;
    this.cropperMaxHeight =
      this.options.cropperMaxHeight || this.cropperMaxHeight;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.width = event.width;
    this.height = event.height;
    this.croppedImage = event.base64;
  }

  scaleChange(value: any) {
    this.scale = value;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  async close() {
    this.coreService.services.crop.close({
      ...this.item,
      original: this.item,
      close: true,
    });
  }

  async save() {
    this.coreService.services.crop.close({
      file: this.base64ToFile(this.croppedImage),
      image64: this.croppedImage,
      original: this.item,
    });
  }

  base64ToFile(base64Image: string): Blob {
    const split = base64Image.split(',');
    const type = split[0].replace('data:', '').replace(';base64', '');
    const byteString = atob(split[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type });
  }
}
