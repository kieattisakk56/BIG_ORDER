import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentLayoutRoutes } from './content-layout.routing';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { IMaskModule } from 'angular-imask';
import { DirectiveModule } from 'src/app/shared/directive/directive.module';
import { ColorSketchModule } from 'ngx-color/sketch';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { QuillModule } from 'ngx-quill';
import { ImageComponent } from 'src/app/components/image/image.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxRerenderModule } from 'ngx-rerender';
import {
  NgbDropdownModule,
  NgbOffcanvasModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from 'src/app/components/modals/form-modal/form-modal.component';
import { SwiperModule } from 'swiper/angular';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SearchFormComponent } from 'src/app/components/search-form/search-form.component';
import { FormlyFieldButtonComponent } from 'src/app/components/formly/field/formly-field-button/formly-field-button.component';
import { FormlyFieldCheckboxComponent } from 'src/app/components/formly/field/formly-field-checkbox/formly-field-checkbox.component';
import { FormlyFieldColorPickerComponent } from 'src/app/components/formly/field/formly-field-color-picker/formly-field-color-picker.component';
import { FormlyFieldDatePickerComponent } from 'src/app/components/formly/field/formly-field-date-picker/formly-field-date-picker.component';
import { FormlyFieldDateRangePickerComponent } from 'src/app/components/formly/field/formly-field-date-range-picker/formly-field-date-range-picker.component';
import { FormlyFieldFileComponent } from 'src/app/components/formly/field/formly-field-file/formly-field-file.component';
import { FormlyFieldFormArrayComponent } from 'src/app/components/formly/field/formly-field-form-array/formly-field-form-array.component';
import { FormlyFieldImageSelectComponent } from 'src/app/components/formly/field/formly-field-image-select/formly-field-image-select.component';
import { FormlyFieldInputComponent } from 'src/app/components/formly/field/formly-field-input/formly-field-input.component';
import { FormlyFieldMapsComponent } from 'src/app/components/formly/field/formly-field-maps/formly-field-maps.component';
import { FormlyFieldMultipleFileComponent } from 'src/app/components/formly/field/formly-field-multiple-file/formly-field-multiple-file.component';
import { FormlyFieldNestedFormComponent } from 'src/app/components/formly/field/formly-field-nested-form/formly-field-nested-form.component';
import { FormlyFieldRadioComponent } from 'src/app/components/formly/field/formly-field-radio/formly-field-radio.component';
import { FormlyFieldSelectComponent } from 'src/app/components/formly/field/formly-field-select/formly-field-select.component';
import { FormlyFieldStepperComponent } from 'src/app/components/formly/field/formly-field-stepper/formly-field-stepper.component';
import { FormlyFieldTextEditorComponent } from 'src/app/components/formly/field/formly-field-text-editor/formly-field-text-editor.component';
import { FormlyFieldTextareaComponent } from 'src/app/components/formly/field/formly-field-textarea/formly-field-textarea.component';
import { FormlyFieldToggleComponent } from 'src/app/components/formly/field/formly-field-toggle/formly-field-toggle.component';
import { FieldWrapperComponent } from 'src/app/components/formly/wrapper/field-wrapper/field-wrapper.component';
import { FormlyWrapperAccordionItemComponent } from 'src/app/components/formly/wrapper/formly-wrapper-accordion-item/formly-wrapper-accordion-item.component';
import { FormlyWrapperAccordionComponent } from 'src/app/components/formly/wrapper/formly-wrapper-accordion/formly-wrapper-accordion.component';
import { FormlyWrapperCardComponent } from 'src/app/components/formly/wrapper/formly-wrapper-card/formly-wrapper-card.component';
import { FormlyFieldFullCalendarComponent } from 'src/app/components/formly/field/formly-field-full-calendar/formly-field-full-calendar.component';
import { ImportBtnComponent } from 'src/app/components/import-btn/import-btn.component';
import { AccordionDefaultComponent } from 'src/app/components/accordions/accordion-default/accordion-default.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormlyFieldDragNDropComponent } from 'src/app/components/formly/field/formly-field-drag-ndrop/formly-field-drag-ndrop.component';
import { FormlyFieldTableComponent } from 'src/app/components/formly/field/formly-field-table/formly-field-table.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormlyFieldInputCurrencyComponent } from 'src/app/components/formly/field/formly-field-input-currency/formly-field-input-currency.component';
import { FormlyFieldInputPercentageComponent } from 'src/app/components/formly/field/formly-field-input-percentage/formly-field-input-percentage.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormlyFieldDateInlinePickerComponent } from 'src/app/components/formly/field/formly-field-date-inline-picker/formly-field-date-inline-picker.component';
import { FormlyFieldSelectMultipleComponent } from 'src/app/components/formly/field/formly-field-select-multiple/formly-field-select-multiple.component';
import { DefaultRequestActionComponent } from 'src/app/components/modals/default-request-action/default-request-action.component';




@NgModule({
  declarations: [
    //////Home
    HomeComponent,
    // Formly

    FormlyFieldDatePickerComponent,
    FormlyFieldDateRangePickerComponent,
    FormlyFieldSelectComponent,
    FormlyFieldInputComponent,
    FormlyFieldFileComponent,
    FormlyFieldMultipleFileComponent,
    FormlyFieldCheckboxComponent,
    FormlyFieldColorPickerComponent,
    FormlyFieldTextareaComponent,
    FormlyFieldTextEditorComponent,
    FormlyFieldMapsComponent,
    FormlyFieldButtonComponent,
    FormlyFieldToggleComponent,
    FormlyFieldStepperComponent,
    FormlyFieldNestedFormComponent,
    FormlyFieldFormArrayComponent,
    FormlyFieldRadioComponent,
    FormlyFieldImageSelectComponent,
    FormlyFieldTableComponent,
    FormlyFieldDragNDropComponent,
    FormlyFieldInputCurrencyComponent,
    FormlyFieldInputPercentageComponent,
    FieldWrapperComponent,
    FormlyWrapperCardComponent,
    FormlyWrapperAccordionComponent,
    FormlyWrapperAccordionItemComponent,
    FormlyFieldSelectMultipleComponent,
    FormlyFieldDateInlinePickerComponent,
    FormlyFieldFullCalendarComponent,
    ImageComponent,
    FormModalComponent,

    SearchFormComponent,
    ImportBtnComponent,
    AccordionDefaultComponent,
  ],
  imports: [
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(ContentLayoutRoutes),
    FormsModule,
    ComponentsModule,
    DirectiveModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgbOffcanvasModule,
    NgbDropdownModule,
    NgxRerenderModule,
    DragDropModule,
    QuillModule,
    SwiperModule,
    IMaskModule,
    ColorSketchModule,
    NgSelectModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FullCalendarModule,
    TabsModule.forRoot()
  ],
})
export class ContentLayoutModule { }
