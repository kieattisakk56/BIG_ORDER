import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldCheckboxComponent } from './formly-field-checkbox.component';

describe('FormlyFieldCheckboxComponent', () => {
  let component: FormlyFieldCheckboxComponent;
  let fixture: ComponentFixture<FormlyFieldCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
