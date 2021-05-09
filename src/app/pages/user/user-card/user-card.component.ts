import {TableData} from '@app/models/table.interface';
import {ChartType} from '@app/enums/chart-type.enum';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input()
  public avatarImag: string = 'assets/img/default-avatar.png';
  @Input()
  public userName: string;
  @Input()
  public userPosition: string;
  @Input()
  public userDescription: string;
  @Input()
  public soldCarsTableData: TableData[];
  @Input()
  public headers: string[];
  @Input()
  public salaries: number[];
  public labels: string[] = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'];

  public ChartType: typeof ChartType = ChartType;
  public shouldDisplaySoldCarsTable: boolean = false;
  public shouldDisplayChart: boolean = false;
  public shouldDisplayTasks: boolean = false;

  public soldCars(): void {
    this.shouldDisplaySoldCarsTable = !this.shouldDisplaySoldCarsTable;
    this.shouldDisplayChart = false;
    this.shouldDisplayTasks = false;
  }

  public displaySalary(): void {
    this.shouldDisplayChart = !this.shouldDisplayChart;
    this.shouldDisplaySoldCarsTable = false;
    this.shouldDisplayTasks = false;
  }

  public displayTasks(): void {
    this.shouldDisplayTasks = !this.shouldDisplayTasks;
    this.shouldDisplayChart = false;
    this.shouldDisplaySoldCarsTable = false;
  }
}
