import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldInputPercentageComponent } from './formly-field-input-percentage.component';

describe('FormlyFieldInputPercentageComponent', () => {
  let component: FormlyFieldInputPercentageComponent;
  let fixture: ComponentFixture<FormlyFieldInputPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldInputPercentageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldInputPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
