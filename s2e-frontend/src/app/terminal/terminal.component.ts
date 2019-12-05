import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { BankAccount } from '../interfaces';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { LandingComponent } from '../landing/landing.component';
import { ApprovalComponent } from '../approval/approval.component';

@Component({
    selector: 'Terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
    private amount: string = '';
    private awaitingPayment: boolean = false;

    private bankAccounts: BankAccount[];

    private listItems: Promise<string[]>;

    private selectedIndex: number = 0;
 
    constructor(private modalService: ModalDialogService, private vcRef: ViewContainerRef, private userService: UserService) { }

    async ngOnInit(): Promise<void> {
        this.bankAccounts = await this.userService.getIbans();
        this.listItems = Promise.resolve(this.bankAccounts.map((bankAccount: BankAccount) => bankAccount.alias));
    }

    input(symbol: string): void {
        this.amount += symbol;
    }

    clear(): void {
        this.amount = this.amount.substring(0, this.amount.length - 1);
    }

    cancel(): void {
        if(this.awaitingPayment) {
            this.awaitingPayment = false;
        }
        else {
            this.amount = '';
        }
    }

    isSymbolEnabled(symbol: string): boolean {
        if(this.awaitingPayment) {
            return false;
        }
        if(symbol === '.') {
            return !this.amount.includes('.');
        }
        return (this.amount.split('.')[1] || '').length < 2;
    }

    isAmountValid(): boolean {
        return parseFloat(this.amount) > 0;
    }

    async enter() {
        this.awaitingPayment = true;
        const tapDetails = <any>await prompt('DEBUG: If customer tapped card, enter card number here');
        if(tapDetails.result) {
            const amount = parseFloat(this.amount);
            const selectedAccount = this.bankAccounts[this.selectedIndex];
            const transactionId = await this.userService.createTransaction(selectedAccount.url, amount, amount * 0.005, selectedAccount.currency, tapDetails.text);

            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: {
                    transaction: transactionId
                },
                fullscreen: true
            };
            
            const success: boolean = await this.modalService.showModal(ApprovalComponent, options);

            if(success) {
                alert('You got paid');
            }
            else {
                alert('User refused');
            }
        }
        this.awaitingPayment = false;
    }

    floor(n: number): number {
        return Math.floor(n);
    }
}
