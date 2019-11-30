import { Component } from "@angular/core";
import { Card } from '../../interfaces';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "CardForm",
    templateUrl: "./card-form.component.html"
})
export class CardFormComponent {
    private card: Card = {
        number: ''
    };

    private isSaving: boolean = false;

    constructor(private params: ModalDialogParams) { }

    private close(card: Card): void {
        this.params.closeCallback(card);
    }

    private validateCardNumber(cardNumber: string): string {
        if (!cardNumber.length) {
            return 'The card number is empty';
        }
        if (!(/^[0-9]{10,19}$/).test(cardNumber)) {
            return 'The card number is in an incorrect format';
        }
        return null;
    }

    /*private async saveCards(cards: Card[], iban: string): Promise<void> {
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
    }*/
}