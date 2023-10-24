import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationSocketsComponent } from './station-sockets.component';

describe('StationSocketsComponent', () => {
  let component: StationSocketsComponent;
  let fixture: ComponentFixture<StationSocketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationSocketsComponent]
    });
    fixture = TestBed.createComponent(StationSocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
