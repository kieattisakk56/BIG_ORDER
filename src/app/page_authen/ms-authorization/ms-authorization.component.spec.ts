import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsAuthorizationComponent } from './ms-authorization.component';

describe('MsAuthorizationComponent', () => {
  let component: MsAuthorizationComponent;
  let fixture: ComponentFixture<MsAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
