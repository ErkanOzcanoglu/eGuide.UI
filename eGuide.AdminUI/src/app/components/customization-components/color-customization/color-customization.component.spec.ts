import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCustomizationComponent } from './color-customization.component';

describe('ColorCustomizationComponent', () => {
  let component: ColorCustomizationComponent;
  let fixture: ComponentFixture<ColorCustomizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorCustomizationComponent]
    });
    fixture = TestBed.createComponent(ColorCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
