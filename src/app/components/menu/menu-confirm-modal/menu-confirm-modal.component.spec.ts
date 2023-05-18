import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConfirmModalComponent } from './menu-confirm-modal.component';

describe('MenuConfirmModalComponent', () => {
  let component: MenuConfirmModalComponent;
  let fixture: ComponentFixture<MenuConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuConfirmModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
