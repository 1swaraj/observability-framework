import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar-component.html',
})
export class NavbarComponent implements OnInit {

  constructor(private appService: AppService) { }
  isCollapsed = true;
  ngOnInit() {
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
