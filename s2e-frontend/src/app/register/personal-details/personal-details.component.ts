import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "~/app/services/user.service";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "PersonalDetails",
    templateUrl: "./personal-details.component.html"
})
export class PersonalDetailsComponent {
    private email: string = '';
    private username: string = '';
    private password: string = '';
    private pin: string = '';
    private emailEmpty: boolean;
    private usernameEmpty: boolean;
    private passwordEmpty: boolean;
    private pinEmpty: boolean;
    private isSaving: boolean = false;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) { }

    async continue() {
        this.validateEmail();
        this.validateUsername();
        this.validatePassword();
        this.validatePin();

        if(!this.emailEmpty && !this.usernameEmpty && !this.passwordEmpty) {
            this.isSaving = true;

            const userData = await this.userService.register(this.username, this.password, this.email, this.pin);
            if(userData) {
                await this.userService.logIn(this.username, this.password);
                this.routerExtensions.navigate(['/bank-accounts']);
            }
            else {
                dialogs.alert({
                    title: 'Registration unsuccessful',
                    message: 'Please check your data and try again',
                    okButtonText: 'Close'
                });
            }

            this.isSaving = false;
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

    validatePin() {
        this.pinEmpty = this.pin.length === 0;
    }
}
