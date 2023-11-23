import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaFormComponent } from './social-media-form.component';

describe('SocialMediaFormComponent', () => {
  let component: SocialMediaFormComponent;
  let fixture: ComponentFixture<SocialMediaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialMediaFormComponent]
    });
    fixture = TestBed.createComponent(SocialMediaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
