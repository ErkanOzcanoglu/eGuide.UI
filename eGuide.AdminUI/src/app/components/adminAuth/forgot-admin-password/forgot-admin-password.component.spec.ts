import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotAdminPasswordComponent } from './forgot-admin-password.component';

describe('ForgotAdminPasswordComponent', () => {
  let component: ForgotAdminPasswordComponent;
  let fixture: ComponentFixture<ForgotAdminPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotAdminPasswordComponent]
    });
    fixture = TestBed.createComponent(ForgotAdminPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
