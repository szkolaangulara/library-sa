import {Routes} from '@angular/router';

import {DashboardComponent} from '@app/pages/dashboard/dashboard.component';
import {IconsComponent} from '@app/pages/icons/icons.component';
import {NotificationsComponent} from '@app/pages/notifications/notifications.component';
import {UserComponent} from '@app/pages/user/user.component';
import {TypographyComponent} from '@app/pages/typography/typography.component';
import {ChartDashboardComponent} from '@app/components/charts/chart-dashboard/chart-dashboard.component';
import {FilesDashboardComponent} from '@app/components/files/files-dashboard/files-dashboard.component';
import {LayoutManagerDashboardComponent} from '@app/components/layout-manager/layout-manager-dashboard/layout-manager-dashboard.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'charts', component: ChartDashboardComponent},
  {path: 'files', component: FilesDashboardComponent},
  {path: 'layout-manager', component: LayoutManagerDashboardComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'user', component: UserComponent},
  {path: 'typography', component: TypographyComponent},
];
