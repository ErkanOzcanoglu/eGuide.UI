import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackChartComponent } from './feedback-chart.component';

describe('FeedbackChartComponent', () => {
  let component: FeedbackChartComponent;
  let fixture: ComponentFixture<FeedbackChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackChartComponent]
    });
    fixture = TestBed.createComponent(FeedbackChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
