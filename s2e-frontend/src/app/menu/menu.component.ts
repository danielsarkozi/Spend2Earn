import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';

@Component({
  selector: 'ns-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

    public menuItems = [
      "Dashboard",
      "Profile",
      "Finances",
      "History",
      "Statistics",
      "Logout"
    ]

    private currentPage = 'Dashboard';

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        
    }

    public openDrawer(args: SwipeGestureEventData) {
        if(args.direction == 1){
          this.drawer.showDrawer();
        }
    }

    public closeDrawer() {
        this.drawer.closeDrawer();
    }

    public onItemTap( item: string ){
      console.log(item);
      this.currentPage = item;
      this.drawer.closeDrawer();
    }

}
