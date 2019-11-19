import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "~/app/services/user.service";
import { BankAccountListItem, BankAccount, Card, CardListItem } from '../../interfaces';

@Component({
    selector: "BankAccounts",
    templateUrl: "./bank-accounts.component.html",
    styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {
    private bankAccounts: BankAccountListItem[] = [
        {
            accountOwner: '',
            alias: '',
            number: '',
            cards: []
        },
    ];

    private isSaving: boolean = false;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) { }

    ngOnInit(): void { }

    addIban() {
        this.bankAccounts.push({
            accountOwner: '',
            alias: '',
            number: '',
            cards: []
        });
    }

    addCard(bankAccount: BankAccount) {
        bankAccount.cards.push({
            number: ''
        });
    }

    removeIban(index: number) {
        this.bankAccounts.splice(index, 1);
    }

    removeCard(bankAccount: BankAccount, index: number) {
        bankAccount.cards.splice(index, 1);
    }

    private async continue(): Promise<void> {
        this.isSaving = true;

        let invalidData = false;
        for (let bankAccount of this.bankAccounts) {
            invalidData = !this.validateIban(bankAccount) || invalidData;
            for (let card of bankAccount.cards) {
                invalidData = !this.validateCard(card) || invalidData;
            }
        }

        if (!invalidData) {
            await this.saveIbans(this.bankAccounts);
            this.routerExtensions.navigate(['/agreement']);
        }

        this.isSaving = false;
    }

    private async saveIbans(bankAccounts: BankAccount[]): Promise<void> {
        const requests = [];
        for (let bankAccount of this.bankAccounts) {
            const request = fetch('https://spend2earn.herokuapp.com/ibans/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.userService.token}`
                },
                body: JSON.stringify({
                    account_owner: 'teszt',
                    alias: 'abcdefg',
                    bank: 69,
                    check_digit: 96,
                    country: 'RO',
                    number: bankAccount.number,
                    owner: this.userService.url
                })
            });
            request.then(response => response.json()).then(json => this.saveCards(bankAccount.cards, json.url));
            requests.push(request);
        }
        await Promise.all(requests);
    }

    private async saveCards(cards: Card[], iban: string): Promise<void> {
        const requests = [];
        for (let card of cards) {
            const request = fetch('https://spend2earn.herokuapp.com/cards/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.userService.token}`
                },
                body: JSON.stringify({
                    number: card.number,
                    iban: iban
                })
            });
            requests.push(request);
        }
        await Promise.all(requests);
    }

    validateIban(bankAccount: BankAccountListItem) {
        if (!bankAccount.number.length) {
            bankAccount.error = 'The IBAN is empty';
            return false;
        }
        if (!(/^[A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{0,30}$/).test(bankAccount.number)) {
            bankAccount.error = 'The IBAN is in an incorrect format';
            return false;
        }
        delete bankAccount.error;
        return true;
    }

    validateCard(card: CardListItem) {
        if (!card.number.length) {
            card.error = 'The card number is empty';
            return false;
        }
        if (!(/^[0-9]{10,19}$/).test(card.number)) {
            card.error = 'The card number is in an incorrect format';
            return false;
        }
        delete card.error;
        return true;
    }
}
