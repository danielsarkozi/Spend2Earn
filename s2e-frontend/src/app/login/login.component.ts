import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    private username: string = '';
    private password: string = '';
    private incorrectCredentials: boolean;
    private usernameEmpty: boolean;
    private passwordEmpty: boolean;

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    async logIn() {
        this.validateUsername();
        this.validatePassword();

        if(!this.usernameEmpty && !this.passwordEmpty) {
            let userAuthenticated = await confirm('Logging in with credentials: ' + this.username + ' ' + this.password + '\nAuthenticate user?');
            if (userAuthenticated) {
                this.routerExtensions.navigate(['/home'], { clearHistory: true });
            }
            else {
                this.incorrectCredentials = true;
            }
        }
    }

    validateUsername() {
        this.usernameEmpty = this.username.length === 0;
    }

    validatePassword() {
        this.passwordEmpty = this.password.length === 0;
    }
}
