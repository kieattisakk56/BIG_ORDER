import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsDrawerComponent } from './terms-drawer.component';

describe('TermsDrawerComponent', () => {
  let component: TermsDrawerComponent;
  let fixture: ComponentFixture<TermsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
