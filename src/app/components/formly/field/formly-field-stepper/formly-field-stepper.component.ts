import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FieldType,
  FieldTypeConfig,
  FormlyFieldConfig,
} from '@ngx-formly/core';
import { CoreService } from 'src/app/core/core.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-formly-field-stepper',
  templateUrl: './formly-field-stepper.component.html',
  styleUrls: ['./formly-field-stepper.component.scss'],
})
export class FormlyFieldStepperComponent extends FieldType<FieldTypeConfig> {
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;
  constructor(
    private coreService: CoreService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  fieldGroup: FormlyFieldConfig[] | undefined = [];

  currentIndex = 0;
  hidden = false;

  ngOnInit(): void {}

  isValid(field: FormlyFieldConfig): boolean {
    if (field.key && field.formControl) {
      return field.formControl.valid;
    }

    return field.fieldGroup
      ? field.fieldGroup.every((f) => this.isValid(f))
      : true;
  }

  next() {
    this.swiper.swiperRef.slideNext(250);
    this.currentIndex = this.swiper.swiperRef.activeIndex;
  }

  back() {
    this.swiper.swiperRef.slidePrev(250);
    this.currentIndex = this.swiper.swiperRef.activeIndex;
  }

  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getFieldGroup() {
    const fieldGroup = this.field.fieldGroup?.filter((e: any) => {
      return !e.hide;
    });
    return fieldGroup || [];
  }

  transitionStart() {
    this.hidden = true;
  }

  transitionEnd() {
    this.hidden = false;
  }
}
