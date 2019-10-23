import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

interface Iban {
    number: string,
    cards: Card[],
    error?: string
}

interface Card {
    number: string,
    error?: string
}

@Component({
    selector: "BankAccounts",
    templateUrl: "./bank-accounts.component.html"
})
export class BankAccountsComponent implements OnInit {
    private ibans: Iban[] = [
        {
            number: '',
            cards: []
        },
    ];

    constructor(private routerExtensions: RouterExtensions) {
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

    continue() {
        let invalidData = false;
        for(let iban of this.ibans) {
            invalidData = !this.validateIban(iban) || invalidData;
            for(let card of iban.cards) {
                invalidData = !this.validateCard(card) || invalidData;
            }
        }

        if(!invalidData) {
            this.routerExtensions.navigate(['/agreement']);
        }
    }

    validateIban(iban: Iban) {
        if(!iban.number.length) {
            iban.error = 'The IBAN is empty';
            return false;
        }
        if(!(/^[A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{0,30}$/).test(iban.number)) {
            iban.error = 'The IBAN is in an incorrect format';
            return false;
        }
        delete iban.error;
        return true;
    }

    validateCard(card: Card) {
        if(!card.number.length) {
            card.error = 'The card number is empty';
            return false;
        }
        if(!(/^[0-9]{10,19}$/).test(card.number)) {
            card.error = 'The card number is in an incorrect format';
            return false;
        }
        delete card.error;
        return true;
    }
}
