import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldDragNDropComponent } from './formly-field-drag-ndrop.component';

describe('FormlyFieldDragNDropComponent', () => {
  let component: FormlyFieldDragNDropComponent;
  let fixture: ComponentFixture<FormlyFieldDragNDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldDragNDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldDragNDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
