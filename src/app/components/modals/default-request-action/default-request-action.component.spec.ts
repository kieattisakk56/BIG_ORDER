import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRequestActionComponent } from './default-request-action.component';

describe('DefaultRequestActionComponent', () => {
  let component: DefaultRequestActionComponent;
  let fixture: ComponentFixture<DefaultRequestActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultRequestActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultRequestActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
