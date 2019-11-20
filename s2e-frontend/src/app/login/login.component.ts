import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "../services/user.service";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    private username: string = '';
    private password: string = '';
    private usernameEmpty: boolean;
    private passwordEmpty: boolean;
    private isLoggingIn: boolean = false;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {}

    ngOnInit(): void {}

    async logIn(): Promise<void> {
        this.validateUsername();
        this.validatePassword();

        if(!this.usernameEmpty && !this.passwordEmpty) {
            this.isLoggingIn = true;
            const success = await this.userService.logIn(this.username, this.password);
            if (success) {
                this.routerExtensions.navigate(['/menu'], { clearHistory: true });
            }
            else {
                dialogs.alert({
                    title: 'Login unsuccessful',
                    message: 'You have supplied invalid credentials',
                    okButtonText: 'Close'
                });
            }
            this.isLoggingIn = false;
        }
    }

    validateUsername() {
        this.usernameEmpty = this.username.length === 0;
    }

    validatePassword() {
        this.passwordEmpty = this.password.length === 0;
    }
}
