import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.scss']
})
export class CurrencyChartComponent implements OnChanges {

  @Input() chartData: { date: string, rate: number }[] = [];
  @Input() chartLabel: string = '';

  private chart?: Chart<'line'>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] || changes['chartLabel']) {
      this.createChart();
    }
  }

  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('currencyChart') as HTMLCanvasElement;

    Chart.register(...registerables);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartData.map(data => data.date),
        datasets: [{
          label: this.chartLabel,
          data: this.chartData.map(data => data.rate),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              usePointStyle: true,
              pointStyle: 'dash'
            }
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                return tooltipItems[0].label;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Дата'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Цена'
            }
          }
        }
      }
    });
  }
}
