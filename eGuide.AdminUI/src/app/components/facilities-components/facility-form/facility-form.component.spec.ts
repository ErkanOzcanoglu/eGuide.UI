import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityFormComponent } from './facility-form.component';

describe('FacilityFormComponent', () => {
  let component: FacilityFormComponent;
  let fixture: ComponentFixture<FacilityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityFormComponent]
    });
    fixture = TestBed.createComponent(FacilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
