import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldColorPickerComponent } from './formly-field-color-picker.component';

describe('FormlyFieldColorPickerComponent', () => {
  let component: FormlyFieldColorPickerComponent;
  let fixture: ComponentFixture<FormlyFieldColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldColorPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
