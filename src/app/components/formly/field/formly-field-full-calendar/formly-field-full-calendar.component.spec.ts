import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldFullCalendarComponent } from './formly-field-full-calendar.component';

describe('FormlyFieldFullCalendarComponent', () => {
  let component: FormlyFieldFullCalendarComponent;
  let fixture: ComponentFixture<FormlyFieldFullCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldFullCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldFullCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
