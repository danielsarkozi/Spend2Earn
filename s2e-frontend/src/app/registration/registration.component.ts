import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "~/app/services/user.service";
import { User, BankAccount } from "../interfaces";
import * as dialogs from 'tns-core-modules/ui/dialogs';

@Component({
    selector: "Registration",
    templateUrl: "./registration.component.html",
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    private step: number = 1;

    private isSaving: boolean = false;

    private user: User = {
        username: '',
        email: '',
        password: '',
        pin: ''
    };

    private bankAccounts: BankAccount[] = [
        {
            accountOwner: 'Joe Biden',
            alias: 'Money',
            number: 'HU69696969',
            cards: [
                {
                    number: '758927592'
                },
                {
                    number: '898090'
                }
            ]
        },
        {
            accountOwner: 'Almafa kft',
            alias: 'Ceges',
            number: 'ES7946840',
            cards: [
                {
                    number: '0000000'
                },
            ]
        },
    ];

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) { }

    ngOnInit(): void { }

    private async continue(): Promise<void> {
        switch(this.step) {
            case 1:
                await this.saveUser();
                break;
            case 2:
                this.routerExtensions.navigate(['/menu'], { clearHistory: true });
                break;
        }
    }

    private async saveUser() {
        //if(!this.emailEmpty && !this.usernameEmpty && !this.passwordEmpty) {
            this.isSaving = true;

            const userData = await this.userService.register(this.user);
            
            if(userData) {
                await this.userService.logIn(this.user.username, this.user.password);
                this.step = 2;
            }
            else {
                dialogs.alert({
                    title: 'Registration unsuccessful',
                    message: 'Please check your data and try again',
                    okButtonText: 'Close'
                });
            }

            this.isSaving = false;
        //}
    }
}
