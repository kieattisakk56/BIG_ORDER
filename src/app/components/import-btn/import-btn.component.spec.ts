import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBtnComponent } from './import-btn.component';

describe('ImportBtnComponent', () => {
  let component: ImportBtnComponent;
  let fixture: ComponentFixture<ImportBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
