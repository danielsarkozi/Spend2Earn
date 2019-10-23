import { Component, Input } from "@angular/core";

@Component({
    selector: "Stepper",
    templateUrl: "./stepper.component.html",
    styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
    @Input() step: string;

    constructor() { }
}
