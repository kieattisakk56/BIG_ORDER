import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';
import { CoreService } from 'src/app/core/core.service';
import { CropOptions } from 'src/app/core/services/core.crop';
import { loadingDTO } from 'src/app/core/services/core.loading';
import * as mime from 'mime';

@Component({
  selector: 'app-formly-field-file',
  templateUrl: './formly-field-file.component.html',
  styleUrls: ['./formly-field-file.component.scss'],
})
export class FormlyFieldFileComponent extends FieldType<FieldTypeConfig> {
  constructor(
    private sanitizer: DomSanitizer,
    private coreService: CoreService
  ) {
    super();
    // this.coreService.services.loading
    //   .getLoading()
    //   .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() { }
  value = '';

  loading!: loadingDTO;
  file = null;
  image: any;
  original = { file: null, image64: '', FileUrl: '' };
  preview: any | undefined = undefined;
  uid = UUID.UUID();

  ratio = 1 / 1;

  deleteFlagFormControl: any;

  prop: {
    labelContainerClass: '';
    inputContainerClass: '';
    defaultValue: any;
    maxSize: number;
    preview: boolean;
    previewFullScreen: boolean;
    required: boolean;
    cropper: boolean;
    cropperOptions: CropOptions;
    deleteFlag: string;
    disabled: boolean;
    placeholder: {
      icon: string;
      text: string;
      class: string;
      iconStyle: string;
    };
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
      defaultValue: null,
      maxSize: 0,
      preview: true,
      previewFullScreen: true,
      required: false,
      cropper: false,
      cropperOptions: {},
      deleteFlag: '',
      disabled: false,
      placeholder: {
        icon: 'fa fa-plus',
        text: '',
        class: '',
        iconStyle: '',
      },
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
    this.prop.maxSize = 10000;
    if (this.prop.defaultValue) {
      this.field.templateOptions.required = false;
      // const file = await this.coreService.services.utility.getFileFromUrl(
      //   this.defaultValue
      // );
      // if (file) {
      //   this.setPreview([file], [this.defaultValue]);
      // } else {
      this.setPreviewFromUrl(this.prop.defaultValue);
      // }
    } else if (this.prop.disabled) {
      this.setPreviewFromUrl('assets/images/placeholder.jpg');
    }
    var value = this.formControl.value;
    this.formControl.setValue(null);
    setTimeout(() => {
      this.formControl.setValue(value);
    }, 0);

    this.formControl.valueChanges.subscribe(async (res: any) => {

      if (this.formControl.value) {
        let body = {
          Id: this.formControl.value,
        }
        try {
          // const resp = await this.coreService.https.file.getFile(body);
          // if (resp.results) {
          //   this.preview = {
          //     ...resp.results,
          //     src: resp.results.fileurl,
          //     name: resp.results.filename,
          //     file_size: resp.results.filesize,
          //     file_path: resp.results.fileurl,
          //   }
          // }
        } catch (error) {
          this.preview = null
        }
      }
    })

  }


  initialValue() {
    this.prop.labelContainerClass = this.to['labelContainerClass'];
    this.prop.inputContainerClass = this.to['inputContainerClass'];
    this.prop.defaultValue = this.to['defaultValue'] || this.prop.defaultValue;
    this.prop.maxSize = this.to['maxSize'] || this.prop.maxSize;
    this.prop.cropper = this.to['cropper'] || this.prop.cropper;
    this.prop.cropperOptions =
      this.to['cropperOptions'] || this.prop.cropperOptions;
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
    if (this.to['placeholder']) {
      this.prop.placeholder = {
        ...this.prop.placeholder,
        ...(this.to['placeholder'] as any),
      };
    }

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
    if (this.prop.cropper) {
      if (this.prop.cropperOptions) {
        if (this.prop.cropperOptions.aspectRatio) {
          this.ratio = this.prop.cropperOptions.aspectRatio;
        }
      }
    }
  }

  async change(event: any) {
    let pass = true;
    const files = event.target.files;

    if (this.prop.maxSize) {
      const size = await this.formatBytes(files[0].size)
      if ((Number(size) > this.prop.maxSize) && pass) {
        event.target.value = '';
        pass = false;
        this.coreService.services.toast.error('ไฟล์มีขนาดใหญ่เกินไป');
      }
    }
    if (pass) {
      if (this.prop.cropper && files[0].type.includes('image')) {
        await this.cropFile(files[0]);
      } else {

        this.preview = undefined;
        this.setPreview(files);

        var resp = await this.uploadFileDoc([files[0]]);
        // this.formControl.setValue(resp.results.id);


      }
    }
    this.value = '';
  }

  cropFile = async (file: any) => {
    if (file.type.includes('image')) {
      this.original.file = file;
      const crop = await this.coreService.services.crop.cropImage(
        this.original,
        this.prop.cropperOptions || {}
      );
      crop.subscribe(async (res: any) => {
        if (!res.close) {
          this.image = res.image64;
          this.file = res.file;
          this.original = res.original;
          this.preview = undefined;
          this.setPreview([res.file]);
          // var resp = await this.uploadFile([res]);
          // this.formControl.setValue(resp.results.id);
        } else {
          this.value = '';
        }
      });
    }
  };

  setPreview(files: any, originalValue?: any) {
    let file = files[0];
    var type = file.type;
    var objectUrl = URL.createObjectURL((file = file));
    var preview = {
      src: type.includes('image')
        ? objectUrl
        : this.coreService.services.utility.getDocPreview(type),

      type: type,
      name: file.name,
      origin: objectUrl,
      path: originalValue || '',
    };
    this.preview = preview;
    if (type.includes('video')) {
      this.coreService.services.utility
        .getVideoCover({ file: file })
        .then((a) => {
          this.preview.src = a;
        });
    }
  }

  setPreviewFromUrl(url: string) {
    this.preview = undefined;
    let extension = url.substring(url.lastIndexOf('.') + 1);
    let type = mime.getType(extension);
    var preview = {
      src:
        type?.includes('image') || extension == 'jfif'
          ? url
          : this.coreService.services.utility.getDocPreview(url),

      type: type,
      name: '',
      origin: url,
      path: url,
    };
    this.preview = preview;
    if (type?.includes('video')) {
      let videoCover =
        'https://raw.githubusercontent.com/gist/pigeonflight/80cb4f51e9bd538b82b3895ad60a38d0/raw/7d4726abfcce7ad4d23763e6a8c942077d603789/video-placeholder.svg';
      this.coreService.services.utility
        .getVideoCover({ url: url })
        .then((a: any) => {
          videoCover = a;
        })
        .catch(() => { })
        .finally(() => {
          this.preview.src = videoCover;
        });
    }
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  imageClick() {
    document.getElementById(this.uid + 'image')?.click();
  }

  async remove() {
    if (this.preview) {
      const c = await this.coreService.services.alert.confirm('ยืนยันการลบไฟล์');
      if (c) {
        this.preview = undefined;
        if (this.prop.defaultValue) {
          this.deleteFlagFormControl.setValue(true);
          this.prop.defaultValue = '';
        } else {

          this.formControl.setValue([]);
        }

        this.value = '';
      }
    }

  }

  getPreviewSize() {
    var style = {
      width: '64px',
      height: '64px',
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
    if (this.to['type'] == 'file') {
      style.width = '64px';
      style.height = '64px';
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


  async uploadFile(files: any) {
    const formData = new FormData();
    files.forEach((element: any) => {
      formData.append('File', element.file, element.original.file.name);
    });

    // return this.coreService.https.file.uploadfile(formData);
  }


  async uploadFileDoc(files: any) {
    const formData = new FormData();

    files.forEach((element: any) => {

      formData.append('File', element, element.name);
    });
    // return this.coreService.https.file.uploadfile(formData);
  }

  async download() {

    window.open(this.preview?.file_path, '_bank')
  }


  async formatBytes(bytes: any, decimals = 3) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
  }

}
