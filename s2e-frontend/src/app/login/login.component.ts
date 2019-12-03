import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "../services/user.service";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    private email: string = '';
    private password: string = '';
    private isLoggingIn: boolean = false;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {}

    ngOnInit(): void {}

    async logIn(): Promise<void> {
        this.isLoggingIn = true;
        const success = await this.userService.logIn(this.email, this.password);
        if (success) {
            this.routerExtensions.navigate(['/terminal'], { clearHistory: true });
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

    validateFieldNotEmpty(value: string): string {
        return value.length ? null : 'This field cannot be empty';
    }
}
