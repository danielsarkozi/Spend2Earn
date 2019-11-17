import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "~/app/services/user.service";
import { Card, Iban } from '../../interfaces';

@Component({
    selector: "BankAccounts",
    templateUrl: "./bank-accounts.component.html",
    styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {
    private ibans: Iban[] = [
        {
            number: '',
            cards: []
        },
    ];

    private isSaving: boolean = false;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    addIban() {
        this.ibans.push({
            number: '',
            cards: []
        });
    }

    addCard(iban: Iban) {
        iban.cards.push({
            number: ''
        });
    }

    removeIban(index: number) {
        this.ibans.splice(index, 1);
    }

    removeCard(iban: Iban, index: number) {
        iban.cards.splice(index, 1);
    }

    private async continue(): Promise<void> {
        this.isSaving = true;

        let invalidData = false;
        for (let iban of this.ibans) {
            invalidData = !this.validateIban(iban) || invalidData;
            for (let card of iban.cards) {
                invalidData = !this.validateCard(card) || invalidData;
            }
        }

        if (!invalidData) {
            await this.saveIbans(this.ibans);
            this.routerExtensions.navigate(['/agreement']);
        }

        this.isSaving = false;
    }

    private async saveIbans(ibans: Iban[]): Promise<void> {
        const requests = [];
        for (let iban of this.ibans) {
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
                    number: iban.number,
                    owner: this.userService.url
                })
            });
            request.then(response => response.json()).then(json => this.saveCards(iban.cards, json.url));
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

    validateIban(iban: Iban) {
        if (!iban.number.length) {
            iban.error = 'The IBAN is empty';
            return false;
        }
        if (!(/^[A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{0,30}$/).test(iban.number)) {
            iban.error = 'The IBAN is in an incorrect format';
            return false;
        }
        delete iban.error;
        return true;
    }

    validateCard(card: Card) {
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
