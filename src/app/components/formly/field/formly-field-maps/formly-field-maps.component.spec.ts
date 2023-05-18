import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldMapsComponent } from './formly-field-maps.component';

describe('FormlyFieldMapsComponent', () => {
  let component: FormlyFieldMapsComponent;
  let fixture: ComponentFixture<FormlyFieldMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
