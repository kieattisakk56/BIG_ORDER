import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

@Component({
  selector: 'app-formly-field-text-editor',
  templateUrl: './formly-field-text-editor.component.html',
  styleUrls: ['./formly-field-text-editor.component.scss'],
})
export class FormlyFieldTextEditorComponent extends FieldType<FieldTypeConfig> {
  constructor(private coreService: CoreService) {
    super();
    this.coreService.services.loading
      .getLoading()
      .subscribe((e) => (this.loading = e));
  }
  ngOnDestroy() {
  }
  loading!: loadingDTO;

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],

      ['code-block'],

      // ['clean'], // remove formatting button

      // ['link', 'image', 'video'], // link and image, video
    ],
  };
}
