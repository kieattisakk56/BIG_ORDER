import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldSelectMultipleComponent } from './formly-field-select-multiple.component';

describe('FormlyFieldSelectMultipleComponent', () => {
  let component: FormlyFieldSelectMultipleComponent;
  let fixture: ComponentFixture<FormlyFieldSelectMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldSelectMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
