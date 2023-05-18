import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyWrapperAccordionComponent } from './formly-wrapper-accordion.component';

describe('FormlyWrapperAccordionComponent', () => {
  let component: FormlyWrapperAccordionComponent;
  let fixture: ComponentFixture<FormlyWrapperAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyWrapperAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyWrapperAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
