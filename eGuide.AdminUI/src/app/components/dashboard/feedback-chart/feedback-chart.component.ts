import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { LogsService } from 'src/app/services/logs.service';

export interface ChartData {
  errorCount: number;
  successCount: number;
  errorName: string;
  successName: string;
}

@Component({
  selector: 'app-feedback-chart',
  templateUrl: './feedback-chart.component.html',
  styleUrls: ['./feedback-chart.component.css'],
})
export class FeedbackChartComponent implements OnInit {
  constructor(private logService: LogsService) {}
  errorNumber?: number;
  sussessNumber?: number;
  chartData: ChartData = {
    errorCount: 0,
    successCount: 0,
    errorName: '',
    successName: '',
  };

  ngOnInit() {
    this.errorLogsCount();
    this.successLogsCount();
  }

  errorLogsCount() {
    this.logService.getErrorLogs().subscribe((data) => {
      this.errorNumber = data.length;
      // this.chart.addPoint(this.errorNumber);
      this.chartData.errorCount = this.errorNumber;
      this.chartData.errorName = 'Error';
    });
    console.log(this.errorNumber, 'error');
  }

  successLogsCount() {
    this.logService.getInfoLogs().subscribe((data) => {
      this.sussessNumber = data.length;
      console.log(this.sussessNumber, 'success');
      this.chartData.successCount = this.sussessNumber;
      this.chartData.successName = 'Success';
      this.addValues();
    });
    console.log(this.errorNumber, 'success');
  }

  addValues() {
    this.chart.ref?.series[0].setData([
      {
        name: this.chartData.errorName,
        y: this.chartData.errorCount,
        color: '#ff0000',
        value: this.errorNumber,
      },
      {
        name: this.chartData.successName,
        y: this.chartData.successCount,
        color: '#00ff00',
        value: this.sussessNumber,
      },
    ]);
  }

  chart = new Chart({
    chart: {
      type: 'column',
      backgroundColor: '#030712',
    },
    title: {
      text: 'Feedback',
      style: {
        color: '#fff',
      },
    },

    series: [
      {
        name: 'Feedback',
        type: 'pie',
        data: [
          {
            name: this.chartData.errorName,
            y: 0,
            color: '#ff0000',
            value: this.errorNumber,
          },
          {
            name: this.chartData.successName,
            y: 0,
            color: '#00ff00',
            value: this.sussessNumber,
          },
        ],
      },
    ],
  });
}
