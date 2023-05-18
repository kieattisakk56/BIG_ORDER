import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldMultipleFileComponent } from './formly-field-multiple-file.component';

describe('FormlyFieldMultipleFileComponent', () => {
  let component: FormlyFieldMultipleFileComponent;
  let fixture: ComponentFixture<FormlyFieldMultipleFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldMultipleFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldMultipleFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
