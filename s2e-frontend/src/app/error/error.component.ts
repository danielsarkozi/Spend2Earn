import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "Error",
    templateUrl: "./error.component.html"
})
export class ErrorComponent implements OnInit {
    @Input() message: string;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
