import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyWrapperCardComponent } from './formly-wrapper-card.component';

describe('FormlyWrapperCardComponent', () => {
  let component: FormlyWrapperCardComponent;
  let fixture: ComponentFixture<FormlyWrapperCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyWrapperCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyWrapperCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
