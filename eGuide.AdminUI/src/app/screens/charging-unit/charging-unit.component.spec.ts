import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChargingUnitComponent } from './charging-unit.component';

describe('ChargingUnitComponent', () => {
  let component: ChargingUnitComponent;
  let fixture: ComponentFixture<ChargingUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargingUnitComponent],
    });
    fixture = TestBed.createComponent(ChargingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
