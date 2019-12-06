

export class TransactionView{
    source_iban : string;
    destination_iban: string;
    amount: number;
    savings: number;
    currency: string;
    color: string;

    constructor(source, destination, amount, savings, currency, color){
        this.source_iban = source;
        this.destination_iban = destination;
        this.amount = amount;
        this.savings = savings;
        this.currency = currency;
        this.color = color;
    }
}