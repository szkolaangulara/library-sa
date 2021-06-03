import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-single-info',
  templateUrl: './card-single-info.component.html',
  styleUrls: ['./card-single-info.component.scss']
})
export class CardSingleInfoComponent {
  @Input()
  public value: string | number;
  @Input()
  public label: string;
  @Input()
  public icon: string;
  @Input()
  public iconColor: string = '#a6a6a6';
  @Input()
  public labelColor: string;
  @Input()
  public valueColor: string;
}
