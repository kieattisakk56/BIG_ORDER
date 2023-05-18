import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldButtonComponent } from './formly-field-button.component';

describe('FormlyFieldButtonComponent', () => {
  let component: FormlyFieldButtonComponent;
  let fixture: ComponentFixture<FormlyFieldButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
