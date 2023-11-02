import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationInformationModalComponent } from './station-information-modal.component';

describe('StationInformationModalComponent', () => {
  let component: StationInformationModalComponent;
  let fixture: ComponentFixture<StationInformationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationInformationModalComponent]
    });
    fixture = TestBed.createComponent(StationInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
