import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNotiComponent } from './navbar-noti.component';

describe('NavbarNotiComponent', () => {
  let component: NavbarNotiComponent;
  let fixture: ComponentFixture<NavbarNotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarNotiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
