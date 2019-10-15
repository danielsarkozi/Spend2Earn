import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

    private username: string;
    private password: string;
    private incorrectCredentials: boolean;

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    async logIn() {
        let userAuthenticated = await confirm('Logging in with credentials: ' + this.username + ' ' + this.password + '\nAuthenticate user?');
        if (userAuthenticated) {
            this.routerExtensions.navigate(['/home']);
        }
        else {
            this.incorrectCredentials = true;
        }
    }
}
