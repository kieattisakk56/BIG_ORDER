import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyWrapperAccordionItemComponent } from './formly-wrapper-accordion-item.component';

describe('FormlyWrapperAccordionItemComponent', () => {
  let component: FormlyWrapperAccordionItemComponent;
  let fixture: ComponentFixture<FormlyWrapperAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyWrapperAccordionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyWrapperAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
