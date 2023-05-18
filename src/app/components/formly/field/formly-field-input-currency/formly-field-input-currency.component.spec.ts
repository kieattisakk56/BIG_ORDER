import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldInputCurrencyComponent } from './formly-field-input-currency.component';

describe('FormlyFieldInputCurrencyComponent', () => {
  let component: FormlyFieldInputCurrencyComponent;
  let fixture: ComponentFixture<FormlyFieldInputCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldInputCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldInputCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
