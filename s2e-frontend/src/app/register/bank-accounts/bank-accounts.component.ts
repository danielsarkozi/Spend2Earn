import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "~/app/services/user.service";
import { BankAccount, Card } from '../../interfaces';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { BankAccountFormComponent } from "../bank-account-form/bank-account-form.component";
import { CardFormComponent } from "../card-form/card-form.component";

@Component({
    selector: "BankAccounts",
    templateUrl: "./bank-accounts.component.html",
    styleUrls: ['./bank-accounts.component.css'],
    providers: [ModalDialogService],
})
export class BankAccountsComponent implements OnInit {

    private isSaving: boolean = false;

    @Input() private bankAccounts: BankAccount[];
    @Output() private bankAccountsChange: EventEmitter<BankAccount[]> = new EventEmitter<BankAccount[]>();

    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private modalService: ModalDialogService, private vcRef: ViewContainerRef) { }

    ngOnInit(): void { }

    private async openBankAccountForm(): Promise<void> {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: {},
            fullscreen: true
        };

        const bankAccount: BankAccount = await this.modalService.showModal(BankAccountFormComponent, options);
        
        if(bankAccount) {
            this.bankAccounts.push(bankAccount);
            this.bankAccountsChange.emit(this.bankAccounts);
        }
    }

    private async openCardForm(bankAccount: BankAccount): Promise<void> {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: { bankAccount: bankAccount.url },
            fullscreen: true
        };

        const card: Card = await this.modalService.showModal(CardFormComponent, options);
        
        if(card) {
            bankAccount.cards.push(card);
            this.bankAccountsChange.emit(this.bankAccounts);
        }
    }
    
    private async removeBankAccount(index: number): Promise<void> {
        const response = await confirm(`Are you sure you want to remove ${this.bankAccounts[index].alias}?`);
        if(response) {
            this.bankAccounts.splice(index, 1);
            this.bankAccountsChange.emit(this.bankAccounts);
        }
    }

    private async removeCard(bankAccount: BankAccount, index: number): Promise<void> {
        if(await confirm(`Are you sure you want to remove CARD NAME?`)) {
            bankAccount.cards.splice(index, 1);
            this.bankAccountsChange.emit(this.bankAccounts);
        }
    }

    /*addBankAccount() {
        const bankAccount = {
            accountOwner: '',
            alias: '',
            number: '',
            cards: [],
            showing: true,
        };
        this.bankAccounts.push(bankAccount);
        setTimeout(() => bankAccount.showing = false, 500);
    }

    addCard(bankAccount: BankAccount) {
        bankAccount.cards.push({
            number: ''
        });
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
    }*/
}
