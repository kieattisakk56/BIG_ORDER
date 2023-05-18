import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConfirmPanelComponent } from './menu-confirm-panel.component';

describe('MenuConfirmPanelComponent', () => {
  let component: MenuConfirmPanelComponent;
  let fixture: ComponentFixture<MenuConfirmPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuConfirmPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConfirmPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
