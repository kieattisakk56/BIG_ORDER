import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { PipeModule } from '../shared/pipe/pipe.module';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CropImageComponent } from './modals/crop-image/crop-image.component';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FloatingControlComponent } from './floating-control/floating-control.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingComponent } from './loading/loading.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MapsComponent } from './modals/maps/maps.component';
import { MobileFrameComponent } from './mobile-frame/mobile-frame.component';
import { ButtonCardComponent } from './button-card/button-card.component';
import { DirectiveModule } from '../shared/directive/directive.module';
import { LinkyModule } from 'ngx-linky';
import { MentionModule } from 'angular-mentions';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgxRerenderModule } from 'ngx-rerender';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { IMaskModule } from 'angular-imask';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarProfileComponent } from './navbar-profile/navbar-profile.component';
import { NavbarNotiComponent } from './navbar-noti/navbar-noti.component';
import { FormlyWrapperAccordionComponent } from './formly/wrapper/formly-wrapper-accordion/formly-wrapper-accordion.component';
import { FormlyWrapperCardComponent } from './formly/wrapper/formly-wrapper-card/formly-wrapper-card.component';
import { FormlyFieldButtonComponent } from './formly/field/formly-field-button/formly-field-button.component';
import { FormlyFieldCheckboxComponent } from './formly/field/formly-field-checkbox/formly-field-checkbox.component';
import { FormlyFieldColorPickerComponent } from './formly/field/formly-field-color-picker/formly-field-color-picker.component';
import { FormlyFieldDatePickerComponent } from './formly/field/formly-field-date-picker/formly-field-date-picker.component';
import { FormlyFieldDateRangePickerComponent } from './formly/field/formly-field-date-range-picker/formly-field-date-range-picker.component';
import { FormlyFieldFileComponent } from './formly/field/formly-field-file/formly-field-file.component';
import { FormlyFieldFormArrayComponent } from './formly/field/formly-field-form-array/formly-field-form-array.component';
import { FormlyFieldImageSelectComponent } from './formly/field/formly-field-image-select/formly-field-image-select.component';
import { FormlyFieldInputComponent } from './formly/field/formly-field-input/formly-field-input.component';
import { FormlyFieldMapsComponent } from './formly/field/formly-field-maps/formly-field-maps.component';
import { FormlyFieldMultipleFileComponent } from './formly/field/formly-field-multiple-file/formly-field-multiple-file.component';
import { FormlyFieldNestedFormComponent } from './formly/field/formly-field-nested-form/formly-field-nested-form.component';
import { FormlyFieldRadioComponent } from './formly/field/formly-field-radio/formly-field-radio.component';
import { FormlyFieldSelectComponent } from './formly/field/formly-field-select/formly-field-select.component';
import { FormlyFieldStepperComponent } from './formly/field/formly-field-stepper/formly-field-stepper.component';
import { FormlyFieldTextEditorComponent } from './formly/field/formly-field-text-editor/formly-field-text-editor.component';
import { FormlyFieldTextareaComponent } from './formly/field/formly-field-textarea/formly-field-textarea.component';
import { FormlyFieldToggleComponent } from './formly/field/formly-field-toggle/formly-field-toggle.component';
import { FormlyFieldTableComponent } from './formly/field/formly-field-table/formly-field-table.component';
import { FormlyFieldDragNDropComponent } from './formly/field/formly-field-drag-ndrop/formly-field-drag-ndrop.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { FormlyFieldInputCurrencyComponent } from './formly/field/formly-field-input-currency/formly-field-input-currency.component';
import { FormlyFieldInputPercentageComponent } from './formly/field/formly-field-input-percentage/formly-field-input-percentage.component';
import { TabsModule } from "ngx-tabs";
import { FormlyFieldSelectMultipleComponent } from './formly/field/formly-field-select-multiple/formly-field-select-multiple.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormlyFieldDateInlinePickerComponent } from './formly/field/formly-field-date-inline-picker/formly-field-date-inline-picker.component';
import { DefaultRequestActionComponent } from './modals/default-request-action/default-request-action.component';
import { FormlyFieldFullCalendarComponent } from './formly/field/formly-field-full-calendar/formly-field-full-calendar.component';
import { MenuCategoryComponent } from './menu/menu-category/menu-category.component';
import { MenuConfirmPanelComponent } from './menu/menu-confirm-panel/menu-confirm-panel.component';
import { MenuConfirmModalComponent } from './menu/menu-confirm-modal/menu-confirm-modal.component';
import { OrderHistoryModalComponent } from './menu/order-history-modal/order-history-modal.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { InViewportModule } from 'ng-in-viewport';

export function playerFactory() {
  return player;
}

export function minLengthValidationMessage(error: any, field: FormlyFieldConfig | any) {
  return `โปรดระบุข้อมูลไม่น้อยกว่า ${field.templateOptions.minlength} ตัวอักษร`;
}
export function maxLengthValidationMessage(error: any, field: FormlyFieldConfig | any) {
  return `โปรดระบุข้อมูลอย่างน้อย ${field.templateOptions.maxLength} ตัวอักษร`;
}
export function requiredValidationMessage(error: any, field: FormlyFieldConfig | any) {
  return `โปรดระบุข้อมูล ${field.templateOptions.label} `;
}

export function minValidationMessage(error: any, field: FormlyFieldConfig | any) {
  return `${field.templateOptions.label} ต้องมีค่ามากกว่าหรือเท่ากับ ${field.props.min}`;
}

export function maxValidationMessage(error: any, field: FormlyFieldConfig | any) {
  return `${field.templateOptions.label} ต้องมีค่าน้อยกว่าหรือเท่ากับ ${field.props.min}`;
}

@NgModule({
  declarations: [
    DatatableComponent,
    CropImageComponent,
    PreviewImageComponent,
    NavbarComponent,
    FloatingControlComponent,
    LoadingComponent,
    MapsComponent,
    MobileFrameComponent,
    // TermsModalComponent,
    ButtonCardComponent,
    NavbarMenuComponent,
    NavbarProfileComponent,
    NavbarNotiComponent,
    MenuCategoryComponent,
    MenuConfirmPanelComponent,
    MenuConfirmModalComponent,
    OrderHistoryModalComponent,
    MenuItemComponent,
  ],
  imports: [
    InViewportModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    CommonModule,
    NgxRerenderModule,
    RouterModule,
    NgSelectModule,
    PipeModule,
    DragDropModule,
    DirectiveModule,
    FormsModule,
    GoogleMapsModule,
    LottieModule.forRoot({ player: playerFactory }),
    CarouselModule.forRoot(),
    FormlyModule.forRoot({
      validators: [
        {
          name: 'required',
          validation: (control: AbstractControl) => {
            if (control.value) {
              if (Array.isArray(control.value)) {
                return control.value.length > 0 ? null : { required: true };
              } else {
                return null;
              }
            }
            return { required: true };
          },
        },
      ],
      validationMessages: [
        { name: 'required', message: requiredValidationMessage },
        { name: 'pattern', message: 'รูปแบบข้อมูลไม่ถูกต้อง' },
        { name: 'minlength', message: minLengthValidationMessage },
        { name: 'maxlength', message: maxLengthValidationMessage },
        { name: 'api', message: '' }
      ],
      wrappers: [
        { name: 'Card', component: FormlyWrapperCardComponent },
        { name: 'Accordion', component: FormlyWrapperAccordionComponent },
      ],
      types: [
        {
          name: 'DragNDrop',
          component: FormlyFieldDragNDropComponent,
        },
        {
          name: 'Table',
          component: FormlyFieldTableComponent,
        },
        {
          name: 'ImageSelect',
          component: FormlyFieldImageSelectComponent,
        },
        {
          name: 'CustomRadio',
          component: FormlyFieldRadioComponent,
        },
        {
          name: 'Toggle',
          component: FormlyFieldToggleComponent,
        },
        {
          name: 'FormArray',
          component: FormlyFieldFormArrayComponent,
        },
        {
          name: 'NestedForm',
          component: FormlyFieldNestedFormComponent,
        },
        {
          name: 'Stepper',
          component: FormlyFieldStepperComponent,
        },
        {
          name: 'DatePicker',
          component: FormlyFieldDatePickerComponent,
        },
        {
          name: 'DatePickerInline',
          component: FormlyFieldDateInlinePickerComponent,
        },
        {
          name: 'DateRangePicker',
          component: FormlyFieldDateRangePickerComponent,
        },
        {
          name: 'CustomSelect',
          component: FormlyFieldSelectComponent,
        },
        {
          name: 'CustomSelectMulti',
          component: FormlyFieldSelectMultipleComponent,
        },
        {
          name: 'CustomInput',
          component: FormlyFieldInputComponent,
        },
        {
          name: 'CustomInputCurrency',
          component: FormlyFieldInputCurrencyComponent,
        },
        {
          name: 'CustomInputPercentage',
          component: FormlyFieldInputPercentageComponent,
        },
        {
          name: 'CustomTextarea',
          component: FormlyFieldTextareaComponent,
        },
        {
          name: 'File',
          component: FormlyFieldFileComponent,
        },
        {
          name: 'FullCalendar',
          component: FormlyFieldFullCalendarComponent,
        },
        {
          name: 'MultipleFile',
          component: FormlyFieldMultipleFileComponent,
        },
        {
          name: 'CustomCheckbox',
          component: FormlyFieldCheckboxComponent,
        },
        {
          name: 'ColorPicker',
          component: FormlyFieldColorPickerComponent,
        },
        {
          name: 'TextEditor',
          component: FormlyFieldTextEditorComponent,
        },
        {
          name: 'Maps',
          component: FormlyFieldMapsComponent,
        },
        {
          name: 'Button',
          component: FormlyFieldButtonComponent,
        },
      ],
    }),
    IMaskModule,
    ImageCropperModule,
    NgxDatatableModule,
    LinkyModule,
    MentionModule,
    GalleryModule,
    LightboxModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    DatatableComponent,
    CropImageComponent,
    PreviewImageComponent,
    NavbarComponent,
    FloatingControlComponent,
    LoadingComponent,
    MobileFrameComponent,
    // TermsModalComponent,
    ButtonCardComponent,
    NavbarMenuComponent,
    MenuCategoryComponent,
    MenuConfirmPanelComponent,
    MenuConfirmModalComponent,
    OrderHistoryModalComponent,
    MenuItemComponent,
  ],

})



export class ComponentsModule { }
