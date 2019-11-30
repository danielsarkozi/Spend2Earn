import { Card } from '.';

export default interface BankAccount {
    number: string,
    alias: string,
    accountOwner: string,
    cards?: Card[],
    url?: string
}