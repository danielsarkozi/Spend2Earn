import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "PersonalDetails",
    templateUrl: "./personal-details.component.html"
})
export class PersonalDetailsComponent {
    private email: string = '';
    private username: string = '';
    private password: string = '';
    private emailEmpty: boolean;
    private usernameEmpty: boolean;
    private passwordEmpty: boolean;

    constructor(private routerExtensions: RouterExtensions) { }

    continue() {
        this.validateEmail();
        this.validateUsername();
        this.validatePassword();

        if(!this.emailEmpty && !this.usernameEmpty && !this.passwordEmpty) {
            this.routerExtensions.navigate(['/bank-accounts']);
        }
    }

    validateEmail() {
        this.emailEmpty = this.email.length === 0;
    }

    validateUsername() {
        this.usernameEmpty = this.username.length === 0;
    }

    validatePassword() {
        this.passwordEmpty = this.password.length === 0;
    }
}
