import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFrameComponent } from './mobile-frame.component';

describe('MobileFrameComponent', () => {
  let component: MobileFrameComponent;
  let fixture: ComponentFixture<MobileFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
