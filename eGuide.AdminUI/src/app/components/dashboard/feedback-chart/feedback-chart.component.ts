import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-feedback-chart',
  templateUrl: './feedback-chart.component.html',
  styleUrls: ['./feedback-chart.component.css'],
})
export class FeedbackChartComponent {
  chart = new Chart({
    chart: {
      type: 'column',
      backgroundColor: '#1D232A',
    },
    title: {
      text: 'Feedback',
      style: {
        color: '#fff',
      },
    },
    xAxis: {
      categories: [
        'Excellent',
        'Very Good',
        'Good',
        'Fair',
        'Poor',
        'Very Poor',
        'Not Applicable',
      ],
    },
    yAxis: {
      title: {
        text: 'Total Feedback',
      },
    },
    series: [{ name: 'Feedback', type: 'pie', data: [1, 2, 3, 4, 5, 6, 7] }],
  });
}
