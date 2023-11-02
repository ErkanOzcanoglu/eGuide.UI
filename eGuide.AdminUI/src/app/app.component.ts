import { Component} from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapseSideNav: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSideNavCollapsed = false;

  closeSideNav(event: SideNavToggle) {
    this.isSideNavCollapsed = event.collapseSideNav;
  }
}
