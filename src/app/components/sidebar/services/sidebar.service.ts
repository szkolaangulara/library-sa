import {Injectable} from '@angular/core';
import {RouteInfo} from '@app/models/router-info.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public prepareMenuItems(): RouteInfo[] {
    return [
      {
        path: '/dashboard',
        title: 'Tablica główna',
        icon: 'icon-chart-pie-36',
      },
      {
        path: '/charts',
        title: 'Wykresy',
        icon: 'icon-chart-bar-32',
      },
      {
        path: '/user',
        title: 'Profil użytkownika',
        icon: 'icon-single-02',
      },
      {
        path: '/layout-manager',
        title: 'Manager rozkładu',
        icon: 'icon-components',
      },
      {
        path: '/files',
        title: 'Pliki',
        icon: 'icon-cloud-download-93',
      },
      {
        path: '/icons',
        title: 'Ikony',
        icon: 'icon-atom',
      },
      {
        path: '/notifications',
        title: 'Powiadomienia',
        icon: 'icon-bell-55',
      }
    ];
  };
}
