import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from "~/app/interfaces";

@Component({
    selector: "PersonalDetails",
    templateUrl: "./personal-details.component.html"
})
export class PersonalDetailsComponent {
    private emailEmpty: boolean;
    private usernameEmpty: boolean;
    private passwordEmpty: boolean;
    private pinEmpty: boolean;

    @Input() private user;

    @Output() private userChanged = new EventEmitter<User>();

    validateEmail() {
        this.emailEmpty = this.user.email.length === 0;
        this.userChanged.emit(this.user);
    }

    validateUsername() {
        this.usernameEmpty = this.user.username.length === 0;
        this.userChanged.emit(this.user);
    }

    validatePassword() {
        this.passwordEmpty = this.user.password.length === 0;
        this.userChanged.emit(this.user);
    }

    validatePin() {
        this.pinEmpty = this.user.pin.length === 0;
        this.userChanged.emit(this.user);
    }
}
