import {Component, Input} from '@angular/core';
import {ViewState} from '@app/enums/view-state.enum';

@Component({
  selector: 'app-view-state',
  templateUrl: './view-state.component.html',
  styleUrls: ['./view-state.component.scss']
})
export class ViewStateComponent {
  @Input()
  public viewState: ViewState;
  public ViewState: typeof ViewState = ViewState;
}
