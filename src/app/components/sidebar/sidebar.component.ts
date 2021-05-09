import {Component, OnInit} from '@angular/core';
import {RouteInfo} from '@app/models/router-info.interface';
import {SidebarService} from '@app/components/sidebar/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];

  constructor(public sidebarService: SidebarService) {
  }

  public ngOnInit(): void {
    this.menuItems = this.sidebarService.prepareMenuItems();
  }
}
