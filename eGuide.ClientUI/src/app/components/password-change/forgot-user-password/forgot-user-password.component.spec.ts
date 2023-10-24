import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotUserPasswordComponent } from './forgot-user-password.component';

describe('ForgotUserPasswordComponent', () => {
  let component: ForgotUserPasswordComponent;
  let fixture: ComponentFixture<ForgotUserPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotUserPasswordComponent]
    });
    fixture = TestBed.createComponent(ForgotUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
