import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldDatePickerComponent } from './formly-field-date-picker.component';

describe('FormlyFieldDatePickerComponent', () => {
  let component: FormlyFieldDatePickerComponent;
  let fixture: ComponentFixture<FormlyFieldDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldDatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
