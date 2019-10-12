import { Component, Input } from "@angular/core";

@Component({
    selector: "Logo",
    templateUrl: "./logo.component.html",
    styleUrls: ['./logo.component.css']
})
export class LogoComponent {
    @Input() size: number;
}
