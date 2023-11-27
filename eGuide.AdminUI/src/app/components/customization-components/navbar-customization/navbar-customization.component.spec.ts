import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCustomizationComponent } from './navbar-customization.component';

describe('NavbarCustomizationComponent', () => {
  let component: NavbarCustomizationComponent;
  let fixture: ComponentFixture<NavbarCustomizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarCustomizationComponent]
    });
    fixture = TestBed.createComponent(NavbarCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
