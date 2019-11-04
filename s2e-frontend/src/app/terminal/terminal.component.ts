import { Component, OnInit } from '@angular/core';

interface BankAccount {
    alias: string,
    currency: string,
    flag: string
}

@Component({
    selector: 'Terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
    private amount: string = '';
    private awaitingPayment: boolean = false;

    private bankAccounts: BankAccount[] = [
        {
            alias: 'Hungarian IBAN Account',
            currency: 'HUF',
            flag: '\uD83C\uDDED\ud83c\uddfa'
        },
        {
            alias: 'French IBAN Account',
            currency: 'EUR',
            flag: '\uD83C\uDDEB\uD83C\uDDF7'
        },
        {
            alias: 'Guinea-Bissau IBAN Account',
            currency: 'XOF',
            flag: '\uD83C\uDDEC\uD83C\uDDFC'
        }
    ];

    private listItems: {} = {
        length: this.bankAccounts.length,
        getItem: (index: number) => this.bankAccounts[index].flag + ' ' + this.bankAccounts[index].alias
    };

    private selectedIndex: number = 0;
 
    constructor() { }

    ngOnInit(): void {
        // Init your component properties here.
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

    enter() {
        this.awaitingPayment = true;
        setTimeout(async () => {
            if(await confirm("DEBUG: Did payer approve payment?")) {
                alert('Mr. Payer has paid you ' + this.bankAccounts[this.selectedIndex].currency + ' ' + this.amount + '.');
            }
            else {
                alert('Mr. Payer refused to pay you ' + this.bankAccounts[this.selectedIndex].currency + ' ' + this.amount + '.');
            }
            this.awaitingPayment = false;
        }, 1000);
    }

    floor(n: number): number {
        return Math.floor(n);
    }
}
