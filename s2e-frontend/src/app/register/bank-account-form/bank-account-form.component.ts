import { Component, OnInit } from "@angular/core";
import { UserService } from "~/app/services/user.service";
import { BankAccount } from '../../interfaces';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import * as dialogs from 'tns-core-modules/ui/dialogs';

@Component({
    selector: "BankAccountForm",
    templateUrl: "./bank-account-form.component.html"
})
export class BankAccountFormComponent implements OnInit {
    private bankAccount: BankAccount = {
        accountOwner: '',
        alias: '',
        number: '',
        cards: [],
    };

    private isSaving: boolean = false;

    constructor(private params: ModalDialogParams, private userService: UserService) { }

    ngOnInit(): void { }

    private async close(bankAccount: BankAccount): Promise<void> {
        if(bankAccount) {
            this.isSaving = true;

            const request = await fetch('https://spend2earn.herokuapp.com/ibans/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.userService.token}`
                },
                body: JSON.stringify({
                    account_owner: bankAccount.accountOwner,
                    alias: bankAccount.alias,
                    bank: 0,
                    check_digit: bankAccount.number.substr(2, 2),
                    country: bankAccount.number.substr(0, 2),
                    number: bankAccount.number.substr(4),
                    owner: this.userService.url
                })
            });

            this.isSaving = false;

            if(!request.ok) {
                request.text().then(console.error);
                dialogs.alert({
                    title: 'Save unsuccessful',
                    message: 'Please check your data and try again',
                    okButtonText: 'Close'
                });
                return;
            }
            bankAccount.url = (await request.json()).url;
        }
        this.params.closeCallback(bankAccount);
    }

    private validateIban(iban: string): string {
        if (!iban.length) {
            return 'The IBAN is empty';
        }
        if (!(/^[A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{0,30}$/).test(iban)) {
            return 'The IBAN is in an incorrect format';
        }
        return null;
    }

    /*private async saveIbans(bankAccounts: BankAccount[]): Promise<void> {
        const requests = [];
        for (let bankAccount of this.bankAccounts) {
            const request = fetch('https://spend2earn.herokuapp.com/ibans/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.userService.token}`
                },
                body: JSON.stringify({
                    account_owner: bankAccount.accountOwner,
                    alias: bankAccount.alias,
                    bank: 0,
                    check_digit: bankAccount.number.substr(2, 2),
                    country: bankAccount.number.substr(0, 2),
                    number: bankAccount.number.substr(4),
                    owner: this.userService.url
                })
            });
            request.then(response => response.json()).then(json => this.saveCards(bankAccount.cards, json.url));
            requests.push(request);
        }
        await Promise.all(requests);
    }*/
}
