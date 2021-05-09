import {Injectable} from '@angular/core';

import {hexToRgb} from '@app/helpers/color.helper';
import {ChartType} from '@app/enums/chart-type.enum';

export interface ChartConfig {
  chartType: ChartType;
  chartData: number[];
  canvasFillStyles: CanvasRenderingContext2D;
  color: string;
  labels: string[];
  options?: any;
  chartColors?: string[];
  borderColors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public getChartConfig(chartConfig: ChartConfig): any {
    switch (chartConfig.chartType) {
      case ChartType.BAR:
        return this.prepareCommonChart(chartConfig);
      case ChartType.DOUGHNUT:
        return this.prepareCommonChart(chartConfig);
      case ChartType.PIE:
        return this.prepareCommonChart(chartConfig);
      case ChartType.LINE:
        return this.prepareLinearChart(chartConfig);
      case ChartType.RADAR:
        return this.prepareRadarChart(chartConfig);
      default:
        return this.prepareLinearChart(chartConfig);
    }
  }

  public prepareBackgroundColor(canvasFillStyles: CanvasRenderingContext2D, color: string): CanvasGradient {
    const canvasGradient: CanvasGradient = canvasFillStyles.createLinearGradient(0, 230, 0, 50);

    const rgbColors: number[] = hexToRgb(color);
    canvasGradient.addColorStop(1, `rgba(${rgbColors[0]},${rgbColors[1]},${rgbColors[2]}, 0.5)`);
    canvasGradient.addColorStop(0.1, 'rgba(64,64,64,0.0)');
    canvasGradient.addColorStop(0, 'rgba(64,64,64,0)');

    return canvasGradient;
  }

  private prepareLinearChart(chartConfig: ChartConfig): any {
    return {
      type: chartConfig.chartType,
      data: {
        labels: chartConfig.labels,
        datasets: [{
          backgroundColor: this.prepareBackgroundColor(chartConfig.canvasFillStyles, chartConfig.color),
          borderColor: chartConfig.color,
          data: chartConfig.chartData,
          borderWidth: 1,
        }]
      },
      options: this.getChartDefaultOptions()
    };
  }

  private prepareCommonChart(chartConfig: ChartConfig): any {
    return {
      type: chartConfig.chartType,
      data: {
        labels: chartConfig.labels,
        datasets: [{
          data: chartConfig.chartData,
          backgroundColor: chartConfig.chartColors || '#F8C471',
          borderColor: chartConfig.borderColors || '#F8C471',
          borderWidth: 1
        }]
      },
      options: chartConfig.options ? chartConfig.options : this.getChartDefaultOptions()
    };
  }

  private prepareRadarChart(chartConfig: ChartConfig): any {
    return {
      type: chartConfig.chartType,
      data: {
        labels: chartConfig.labels,
        datasets: [{
          label: 'Jan Kowalski',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
        }, {
          label: 'Jan Nowak',
          data: [28, 48, 40, 19, 96, 27, 14],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
        }]
      },
      options: this.getChartDefaultOptions()
    }
  }

  private getChartDefaultOptions(): any {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
    };
  }
}
