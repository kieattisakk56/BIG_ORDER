import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldTextareaComponent } from './formly-field-textarea.component';

describe('FormlyFieldTextareaComponent', () => {
  let component: FormlyFieldTextareaComponent;
  let fixture: ComponentFixture<FormlyFieldTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
