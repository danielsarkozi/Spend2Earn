import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { User } from "~/app/interfaces";

@Component({
    selector: "PersonalDetails",
    templateUrl: "./personal-details.component.html"
})
export class PersonalDetailsComponent implements OnInit {
    @Input() private user;

    @Output() private userChanged = new EventEmitter<User>();

    @Output() private isDataValid: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {
        this.isDataValid.emit(false);
    }

    private checkValidity(): void {
        if (this.validateEmail(this.user.email, true) ||
            this.validatePassword(this.user.password, true) ||
            this.validatePin(this.user.pin, true)) {
            this.isDataValid.emit(false);
        }
        else {
            this.isDataValid.emit(true);
        }
    }

    private validateEmail(email: string, checkValidity: boolean = false): string {
        if (!checkValidity) {
            //this.userChanged.emit(this.user);
            //this.checkValidity();
        }
        if (!email.length) {
            return 'The field is empty';
        }
        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(email)) {
            return 'Your email address is in an incorrect format';
        }
        return null;
    }

    private validatePassword(password: string, checkValidity: boolean = false): string {
        if (!checkValidity) {
            //this.userChanged.emit(this.user);
            //this.checkValidity();
        }
        if (!password.length) {
            return 'The field is empty';
        }
        return null;
    }

    private validatePin(pin: string, checkValidity: boolean = false): string {
        if (!checkValidity) {
            //this.userChanged.emit(this.user);
            //this.checkValidity();
        }
        if (!/^\d{4,6}$/.test(pin)) {
            return 'Your PIN must contain between 4 and 6 digits';
        }
        return null;
    }
}
