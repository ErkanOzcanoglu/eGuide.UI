import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationModelComponent } from './station-model.component';

describe('StationModelComponent', () => {
  let component: StationModelComponent;
  let fixture: ComponentFixture<StationModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationModelComponent]
    });
    fixture = TestBed.createComponent(StationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
