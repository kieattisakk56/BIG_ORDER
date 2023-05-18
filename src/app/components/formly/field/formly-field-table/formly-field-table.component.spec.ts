import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldTableComponent } from './formly-field-table.component';

describe('FormlyFieldTableComponent', () => {
  let component: FormlyFieldTableComponent;
  let fixture: ComponentFixture<FormlyFieldTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
