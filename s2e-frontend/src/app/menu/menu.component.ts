import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { RouterExtensions } from "nativescript-angular/router";


@Component({
  selector: 'Menu',
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

    constructor(private _changeDetectionRef: ChangeDetectorRef, private routerExtensions: RouterExtensions) {
    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
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

    onItemTap( item: string ){
      console.log(item == "Logout");
      if(item == "Logout"){
        this.routerExtensions.navigate(["landing"], { clearHistory: true })
      }else{
        this.routerExtensions.navigate([item.toLowerCase()])
      }
    }

    getUrl( item: string ){
      return item.toLowerCase()
    }

}
