import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "AddButton",
    templateUrl: "./add-button.component.html",
    styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
    private username: string = '';
    private password: string = '';
    private incorrectCredentials: boolean;
    private usernameEmpty: boolean;
    private passwordEmpty: boolean;

    @Input() text: string;

    @Output() tap = new EventEmitter();

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onTap($event) {
        this.tap.emit($event);
    }

    async logIn() {
        this.validateUsername();
        this.validatePassword();

        if(!this.usernameEmpty && !this.passwordEmpty) {
            let userAuthenticated = this.username === 'admin' && this.password === 'admin';
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
