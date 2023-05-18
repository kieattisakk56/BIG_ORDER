import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';
import * as mime from 'mime';
import { CoreService } from 'src/app/core/core.service';
import { CropOptions } from 'src/app/core/services/core.crop';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-multiple-file',
  templateUrl: './formly-field-multiple-file.component.html',
  styleUrls: ['./formly-field-multiple-file.component.scss'],
})
export class FormlyFieldMultipleFileComponent extends FieldType<FieldTypeConfig> {
  constructor(
    private sanitizer: DomSanitizer,
    private coreService: CoreService
  ) {
    super();
    // this.coreService.services.loading
    //   .getLoading()
    //   .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() {
  }
  value = '';

  loading!: loadingDTO;
  file = null;
  image: any;
  original = { file: null, image64: '', FileUrl: '' };
  previews: any[] = [];
  uid = UUID.UUID();

  ratio = 1 / 1;

  deleteFlagFormControl: any;

  prop: {
    labelContainerClass: '';
    inputContainerClass: '';
    defaultValue: any[];
    maxSize: number;
    preview: boolean;
    previewFullScreen: boolean;
    required: boolean;
    deleteFlag: string;
    disabled: boolean;
    previewTemplate: {
      wrapperClass: string;
      wrapperW: number | undefined;
      wrapperH: number | undefined;
      previewClass: string;
      previewW: number | undefined;
      previewH: number | undefined;
    };
  } = {
    labelContainerClass: '',
    inputContainerClass: '',
    defaultValue: [],
    maxSize: 0,
    preview: true,
    previewFullScreen: true,
    required: false,
    deleteFlag: '',
    disabled: false,
    previewTemplate: {
      wrapperClass: '',
      wrapperW: undefined,
      wrapperH: undefined,
      previewClass: '',
      previewW: undefined,
      previewH: undefined,
    },
  };

  async ngOnInit(): Promise<void> {
    this.initialValue();

    if (this.prop.defaultValue.length > 0) {
      this.field.templateOptions.required = false;

      const files: File[] = [];
      const urls: string[] = [];
      await this.prop.defaultValue.forEach(
        async (element: any, index: number) => {
          // const file = await this.coreService.services.utility.getFileFromUrl(
          //   element.FileUrl
          // );
          // if (file) {
          //   files.push(file);
          // } else {
          urls.push(element.FileUrl);
          // }

          if (index == this.prop.defaultValue.length - 1) {
            this.setPreviewFromUrl(urls);
            this.setPreview(files, this.prop.defaultValue);
          }
        }
      );
    } else if (this.prop.disabled) {
      this.setPreviewFromUrl(['assets/images/placeholder.jpg']);
    }
    if (this.formControl.value) {
      this.setPreview(this.formControl.value);
    }
  }

  initialValue() {
    this.prop.labelContainerClass = this.to['labelContainerClass'];
    this.prop.inputContainerClass = this.to['inputContainerClass'];
    this.prop.defaultValue = this.to['defaultValue'] || this.prop.defaultValue;
    this.prop.maxSize = this.to['maxSize'] || this.prop.maxSize;
    this.prop.deleteFlag = this.to['deleteFlag'] || this.prop.deleteFlag;
    this.prop.previewTemplate.previewClass =
      this.to['previewClass'] || this.prop.previewTemplate.previewClass;
    this.prop.previewTemplate.previewH =
      this.to['previewH'] || this.prop.previewTemplate.previewH;
    this.prop.previewTemplate.previewW =
      this.to['previewW'] || this.prop.previewTemplate.previewW;
    this.prop.previewTemplate.wrapperClass =
      this.to['wrapperClass'] || this.prop.previewTemplate.wrapperClass;
    this.prop.previewTemplate.wrapperH =
      this.to['wrapperH'] || this.prop.previewTemplate.wrapperH;
    this.prop.previewTemplate.wrapperW =
      this.to['wrapperW'] || this.prop.previewTemplate.wrapperW;

    if (this.to['preview'] != null) {
      this.prop.preview = this.to['preview'];
    }
    if (this.to['disabled'] != null) {
      this.prop.disabled = this.to['disabled'];
    }
    if (this.to['previewFullScreen'] != null) {
      this.prop.previewFullScreen = this.to['previewFullScreen'];
    }
    if (this.field.templateOptions.required != null) {
      this.prop.required = this.field.templateOptions.required;
    }

    if (this.prop.deleteFlag) {
      this.deleteFlagFormControl = this.form.controls[this.prop.deleteFlag];
    }
  }

  change(event: any) {
    let pass = true;
    const files = event.target.files;
    if (this.prop.maxSize) {
      files.forEach((element: any) => {
        if (this.prop.maxSize < element.size && pass) {
          event.target.value = '';
          pass = false;
          alert('File is too big.');
        }
      });
    }
    if (pass) {
      this.setPreview(files);
      if (this.formControl.value) {
        this.formControl.setValue([...this.formControl.value, ...files]);
      } else {
        this.formControl.setValue([...files]);
      }
    }
    this.value = '';
  }

  setPreview(files: any, originalValue?: any) {
    if (this.prop.preview) {
      const startIndex = this.previews.length;
      Array.from(files).forEach((file: any, index: number) => {
        //file type ref https://www.iana.org/assignments/media-types/media-types.xhtml
        var type = file.type;
        if (type.includes('video')) {
          this.coreService.services.utility
            .getVideoCover({ file: file })
            .then((a) => {
              if (this.previews[index + startIndex]) {
                this.previews[index + startIndex].src = a;
              } else {
                while (this.previews[index + startIndex] == null) {
                  if (this.previews[index + startIndex]) {
                    this.previews[index + startIndex].src = a;
                  }
                }
              }
            });
        }
        var objectUrl = URL.createObjectURL((file = file));
        var preview = {
          src: type.includes('image')
            ? objectUrl
            : this.coreService.services.utility.getDocPreview(type),
          type: type,
          name: file.name,
          origin: objectUrl,
          path: originalValue ? originalValue[index + startIndex] : '',
        };
        this.previews.push(preview);
      });
    }
  }

  setPreviewFromUrl(urls: any) {
    if (this.prop.preview) {
      this.previews = [];
      Array.from(urls).forEach((url: any, index: number) => {
        //file type ref https://www.iana.org/assignments/media-types/media-types.xhtml
        let extension = url.substring(url.lastIndexOf('.') + 1);
        let type = mime.getType(extension);
        if (type?.includes('video')) {
          let videoCover =
            'https://raw.githubusercontent.com/gist/pigeonflight/80cb4f51e9bd538b82b3895ad60a38d0/raw/7d4726abfcce7ad4d23763e6a8c942077d603789/video-placeholder.svg';
          this.coreService.services.utility
            .getVideoCover({ url: url })
            .then((a: any) => {
              videoCover = a;
            })
            .finally(() => {
              if (this.previews[index]) {
                this.previews[index].src = videoCover;
              } else {
                while (this.previews[index] == null) {
                  if (this.previews[index]) {
                    this.previews[index].src = videoCover;
                  }
                }
              }
            });
        }
        var preview = {
          src:
            type?.includes('image') || extension == 'jfif'
              ? url
              : this.coreService.services.utility.getDocPreview(url),

          type: type,
          name: '',
          origin: url,
          path: urls[index],
        };
        this.previews.push(preview);
      });
    }
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  imageClick(index: number) {
    document.getElementById(this.uid + index)?.click();
  }

  remove(index: number) {
    this.previews.splice(index, 1);
    if (this.prop.defaultValue.length > 0) {
      this.deleteFlagFormControl.setValue([
        ...this.deleteFlagFormControl.value,
        this.prop.defaultValue[index].FileID,
      ]);
      this.prop.defaultValue.splice(index, 1);
    } else {
      var value = this.formControl.value;
      value.splice(index, 1);
      this.formControl.setValue(value);
    }

    this.value = '';
  }

  getPreviewSize() {
    var style = {
      width: '100px',
      height: '100px',
    };
    if (
      this.prop.previewTemplate.previewW &&
      this.prop.previewTemplate.previewH
    ) {
      style.width = this.prop.previewTemplate.previewW + 'px';
      style.height = this.prop.previewTemplate.previewH + 'px';
    } else {
      if (this.prop.previewTemplate.previewW) {
        style.width = this.prop.previewTemplate.previewW + 'px';
        style.height = this.prop.previewTemplate.previewW / this.ratio + 'px';
      } else if (this.prop.previewTemplate.previewH) {
        style.width = this.prop.previewTemplate.previewH * this.ratio + 'px';
        style.height = this.prop.previewTemplate.previewH + 'px';
      } else {
        style.width = 100 * this.ratio + 'px';
      }
    }
    return style;
  }

  getPreviewWrapperSize() {
    var style = {
      width: '',
      height: '',
    };
    if (this.prop.previewTemplate.wrapperW) {
      style.width = this.prop.previewTemplate.wrapperW + 'px';
    }
    if (this.prop.previewTemplate.wrapperH) {
      style.height = this.prop.previewTemplate.wrapperH + 'px';
    }
    return style;
  }
}
