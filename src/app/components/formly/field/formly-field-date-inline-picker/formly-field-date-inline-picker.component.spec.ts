import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldDateInlinePickerComponent } from './formly-field-date-inline-picker.component';

describe('FormlyFieldDateInlinePickerComponent', () => {
  let component: FormlyFieldDateInlinePickerComponent;
  let fixture: ComponentFixture<FormlyFieldDateInlinePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldDateInlinePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldDateInlinePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
