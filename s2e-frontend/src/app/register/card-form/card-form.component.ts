import { Component } from "@angular/core";
import { Card } from '../../interfaces';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { UserService } from "~/app/services/user.service";
import * as dialogs from 'tns-core-modules/ui/dialogs';

@Component({
    selector: "CardForm",
    templateUrl: "./card-form.component.html"
})
export class CardFormComponent {
    private card: Card = {
        number: '',
        alias: ''
    };

    private isSaving: boolean = false;

    constructor(private params: ModalDialogParams, private userService: UserService) { }

    private async close(card: Card): Promise<void> {
        if(card) {
            this.isSaving = true;

            const request = await fetch('https://spend2earn.herokuapp.com/cards/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.userService.token}`
                },
                body: JSON.stringify({
                    number: card.number,
                    alias: card.alias,
                    iban: this.params.context.bankAccount
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
        }
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
}
