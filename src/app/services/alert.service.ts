import {Injectable} from '@angular/core';

import {ToastrService} from 'ngx-toastr';

import {AlertAlign, AlertDirection, AlertType} from '@app/enums/alert.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastrService: ToastrService) {
  }

  public success(message: string, alertDirection: AlertDirection = AlertDirection.BOTTOM, alertAlign: AlertAlign = AlertAlign.LEFT): void {
    this.prepareNotification(message, AlertType.SUCCESS, alertDirection, alertAlign, 'icon-check-2');
  }

  public error(message: string, alertDirection: AlertDirection = AlertDirection.BOTTOM, alertAlign: AlertAlign = AlertAlign.LEFT): void {
    this.prepareNotification(message, AlertType.ERROR, alertDirection, alertAlign, 'icon-simple-remove');
  }

  public primary(message: string, alertDirection: AlertDirection = AlertDirection.BOTTOM, alertAlign: AlertAlign = AlertAlign.LEFT): void {
    this.prepareNotification(message, AlertType.PRIMARY, alertDirection, alertAlign);
  }

  public info(message: string, alertDirection: AlertDirection = AlertDirection.BOTTOM, alertAlign: AlertAlign = AlertAlign.LEFT): void {
    this.prepareNotification(message, AlertType.INFO, alertDirection, alertAlign, 'icon-chat-33');
  }

  public warning(message: string, alertDirection: AlertDirection = AlertDirection.BOTTOM, alertAlign: AlertAlign = AlertAlign.LEFT): void {
    this.prepareNotification(message, AlertType.WARNING, alertDirection, alertAlign, 'icon-alert-circle-exc');
  }

  private prepareMessage(message: string, icon: string): string {
    return `<span class="tim-icons ${icon}" [data-notify]="icon"></span> ${message}.`;
  }

  private prepareOverride(alertDirection: AlertDirection, alertAlign: AlertAlign, alertType: AlertType) {
    return {
      disableTimeOut: false,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${alertType} alert-with-icon`,
      positionClass: `toast-${alertDirection}-${alertAlign}`
    }
  }

  private prepareNotification(message: string, alertType: AlertType, alertDirection: AlertDirection, alertAlign: AlertAlign, icon: string = 'icon-bell-55'): void {
    this.toastrService.show(
      this.prepareMessage(message, icon),
      '',
      this.prepareOverride(alertDirection, alertAlign, alertType)
    );
  }
}
