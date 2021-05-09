import {Component} from '@angular/core';

import {ChartType} from '@app/enums/chart-type.enum';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})
export class ChartDashboardComponent {

  public lineChartData: number[] = [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100];
  public barChartData: number[] = [187, 145, 190, 170, 185, 90, 75, 90, 95, 80, 96, 120];
  public pieChartData: number[] = [187, 145, 190, 170, 185, 90, 75, 90, 95, 80, 96, 120];
  public doughnutChartData: number[] = [40, 25, 12, 45, 60, 70, 45, 90, 25, 80, 46, 100];
  public chartLabels: string[] = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'];
  public chartRadarLabels: string[] =  [
    'Umówione spotkania',
    'Sprzedane samochody',
    'W trakcie',
    'Odrzucone',
    'Liczba klientów',
    'Zwroty',
    'Zamiana'
  ];
  public chartColors: string[] = [
    'rgb(192, 57, 43, 0.2)',
    'rgb(231, 76, 60, 0.2)',
    'rgb(155, 89, 182, 0.2)',
    'rgb(142, 68, 173, 0.2)',
    'rgb(41, 128, 185, 0.2)',
    'rgb(52, 152, 219, 0.2)',
    'rgb(26, 188, 156, 0.2)',
    'rgb(22, 160, 133, 0.2)',
    'rgb(39, 174, 96, 0.2)',
    'rgb(46, 204, 113, 0.2)',
    'rgb(241, 196, 15, 0.2)',
    'rgb(243, 156, 18, 0.2)',
    ];
  public chartBorderColors: string[] = [
    'rgb(192, 57, 43)',
    'rgb(231, 76, 60)',
    'rgb(155, 89, 182)',
    'rgb(142, 68, 173)',
    'rgb(41, 128, 185)',
    'rgb(52, 152, 219)',
    'rgb(26, 188, 156)',
    'rgb(22, 160, 133)',
    'rgb(39, 174, 96)',
    'rgb(46, 204, 113)',
    'rgb(241, 196, 15)',
    'rgb(243, 156, 18)',
  ];

  public ChartType: typeof ChartType = ChartType;
}
