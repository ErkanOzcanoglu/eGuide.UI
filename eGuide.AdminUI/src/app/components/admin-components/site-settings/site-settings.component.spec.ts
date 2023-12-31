import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSettingsComponent } from './site-settings.component';

describe('SiteSettingsComponent', () => {
  let component: SiteSettingsComponent;
  let fixture: ComponentFixture<SiteSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteSettingsComponent]
    });
    fixture = TestBed.createComponent(SiteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
