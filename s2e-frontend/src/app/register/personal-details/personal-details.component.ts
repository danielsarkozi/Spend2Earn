import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "~/app/services/user.service";

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

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) { }

    continue() {
        this.validateEmail();
        this.validateUsername();
        this.validatePassword();

        if(!this.emailEmpty && !this.usernameEmpty && !this.passwordEmpty) {
            this.userService.register(this.username, this.password, this.email);
            this.userService.logIn(this.username, this.password);

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
