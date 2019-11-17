import { Card } from './';

export default interface Iban {
    number: string,
    cards?: Card[],
    error?: string
}