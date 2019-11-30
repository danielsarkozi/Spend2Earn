import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "LoadingButton",
    templateUrl: "./loading-button.component.html",
    styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent implements OnInit {

    @Input() text: string;
    @Input() isLoading: boolean;
    @Input() style: string;
    @Input() secondary: boolean;

    @Output() tap = new EventEmitter();

    constructor() { }

    ngOnInit(): void { }

    onTap($event) {
        if(!this.isLoading) {
            this.tap.emit($event);
        }
    }
}
