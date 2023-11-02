import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLinkConfirmComponent } from './email-link-confirm.component';

describe('EmailLinkConfirmComponent', () => {
  let component: EmailLinkConfirmComponent;
  let fixture: ComponentFixture<EmailLinkConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailLinkConfirmComponent]
    });
    fixture = TestBed.createComponent(EmailLinkConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
