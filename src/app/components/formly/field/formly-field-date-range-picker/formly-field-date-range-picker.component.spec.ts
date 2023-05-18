import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldDateRangePickerComponent } from './formly-field-date-range-picker.component';

describe('FormlyFieldDateRangePickerComponent', () => {
  let component: FormlyFieldDateRangePickerComponent;
  let fixture: ComponentFixture<FormlyFieldDateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldDateRangePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
