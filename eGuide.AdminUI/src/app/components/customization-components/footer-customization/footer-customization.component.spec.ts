import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCustomizationComponent } from './footer-customization.component';

describe('FooterCustomizationComponent', () => {
  let component: FooterCustomizationComponent;
  let fixture: ComponentFixture<FooterCustomizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterCustomizationComponent]
    });
    fixture = TestBed.createComponent(FooterCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
