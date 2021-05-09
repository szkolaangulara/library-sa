import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgxMaskModule} from 'ngx-mask';
import {UserComponent} from '@app/pages/user/user.component';
import {CardComponent} from '@app/components/card/card.component';
import {ChartComponent} from '@app/components/charts/chart/chart.component';
import {InputComponent} from '@app/components/form/input/input.component';
import {MaterialModule} from '@app/modules/material.module';
import {IconsComponent} from '@app/pages/icons/icons.component';
import {TableComponent} from '@app/components/table/table.component';
import {TasksComponent} from '@app/components/tasks/tasks.component';
import {DialogComponent} from '@app/components/dialog/dialog.component';
import {ComponentsModule} from '@app/components/components.module';
import {CarCardComponent} from '@app/components/car-card/car-card.component';
import {TextAreaComponent} from '@app/components/form/text-area/text-area.component';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {UserCardComponent} from '@app/pages/user/user-card/user-card.component';
import {LocaleCurrencyPipe} from '@app/pipes/locale-currency.pipe';
import {DashboardComponent} from '@app/pages/dashboard/dashboard.component';
import {TypographyComponent} from '@app/pages/typography/typography.component';
import {FlexboxGuideComponent} from '@app/components/layout-manager/flexbox-guide/flexbox-guide.component';
import {FileUploaderComponent} from '@app/components/files/file-uploader/file-uploader.component';
import {NotificationsComponent} from '@app/pages/notifications/notifications.component';
import {AddTaskDialogComponent} from '@app/components/tasks/add-task-dialog/add-task-dialog.component';
import {FilesDashboardComponent} from '@app/components/files/files-dashboard/files-dashboard.component';
import {ChartDashboardComponent} from '@app/components/charts/chart-dashboard/chart-dashboard.component';
import {DragAndDropFileDirective} from '@app/directives/drag-and-drop-file.directive';
import {AddCarDialogFormComponent} from '@app/components/layout-manager/add-car-dialog-form/add-car-dialog-form.component';
import {ContentContainerComponent} from '@app/components/content-container/content-container.component';
import {LayoutManagerDashboardComponent} from '@app/components/layout-manager/layout-manager-dashboard/layout-manager-dashboard.component';


@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxMaskModule,
    ComponentsModule,
  ],
  declarations: [
    UserComponent,
    CardComponent,
    InputComponent,
    ChartComponent,
    TasksComponent,
    IconsComponent,
    DialogComponent,
    TableComponent,
    CarCardComponent,
    UserCardComponent,
    TextAreaComponent,
    DashboardComponent,
    LocaleCurrencyPipe,
    TypographyComponent,
    FlexboxGuideComponent,
    FileUploaderComponent,
    NotificationsComponent,
    AddTaskDialogComponent,
    ChartDashboardComponent,
    FilesDashboardComponent,
    DragAndDropFileDirective,
    ContentContainerComponent,
    AddCarDialogFormComponent,
    LayoutManagerDashboardComponent
  ],
  providers: [LocaleCurrencyPipe, DatePipe]
})
export class AdminLayoutModule {
}
