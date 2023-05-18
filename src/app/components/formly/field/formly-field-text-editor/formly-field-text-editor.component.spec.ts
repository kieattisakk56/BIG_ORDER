import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldTextEditorComponent } from './formly-field-text-editor.component';

describe('FormlyFieldTextEditorComponent', () => {
  let component: FormlyFieldTextEditorComponent;
  let fixture: ComponentFixture<FormlyFieldTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldTextEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
