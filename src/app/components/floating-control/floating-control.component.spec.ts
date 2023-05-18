import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingControlComponent } from './floating-control.component';

describe('FloatingControlComponent', () => {
  let component: FloatingControlComponent;
  let fixture: ComponentFixture<FloatingControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
