import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AlertService} from '@app/services/alert.service';
import {AlertAlign, AlertDirection} from '@app/enums/alert.enum';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  public AlertDirection: typeof AlertDirection = AlertDirection;
  public AlertAlign: typeof AlertAlign = AlertAlign;

  constructor(private toastr: ToastrService, private alertService: AlertService) {
  }

  showNotification(alertDirection: AlertDirection, alertAlign: AlertAlign) {

    const alertType = Math.floor((Math.random() * 5) + 1);

    switch (alertType) {
      case 1:
        this.alertService.success('Success - przykład alertu', alertDirection, alertAlign);
        break;
      case 2:
        this.alertService.error('Error - przykład alertu', alertDirection, alertAlign);
        break;
      case 3:
        this.alertService.warning('Warning - przykład alertu', alertDirection, alertAlign);
        break;
      case 4:
        this.alertService.info('Info - przykład alertu', alertDirection, alertAlign);
        break;
      case 5:
        this.alertService.primary('Primary - przykład alertu', alertDirection, alertAlign);
        break;
      default:
        break;
    }
  }

  ngOnInit() {
  }
}
