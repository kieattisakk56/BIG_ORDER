import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldRadioComponent } from './formly-field-radio.component';

describe('FormlyFieldRadioComponent', () => {
  let component: FormlyFieldRadioComponent;
  let fixture: ComponentFixture<FormlyFieldRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
