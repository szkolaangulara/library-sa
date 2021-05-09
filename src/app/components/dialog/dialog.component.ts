import {Component, ViewChild, ViewContainerRef} from '@angular/core';

import {Subject} from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public onClose$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('childComponentPlacement', {read: ViewContainerRef})
  public childComponentPlacementContainer: ViewContainerRef;

  public onOverlayClick(mouseEvent: MouseEvent): void {
    this.onClose$.next(true);
  }

  public closeDialog(): void {
    this.onClose$.next(true);
  }

  public onDialogClick(mouseEvent: MouseEvent): void {
    mouseEvent.stopPropagation();
  }
}
