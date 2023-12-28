import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationProfileComponent } from './station-profile.component';

describe('StationProfileComponent', () => {
  let component: StationProfileComponent;
  let fixture: ComponentFixture<StationProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationProfileComponent]
    });
    fixture = TestBed.createComponent(StationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
