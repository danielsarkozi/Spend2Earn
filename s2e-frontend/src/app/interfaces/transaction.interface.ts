export default interface Transaction{
    source: string;
    dest: string;
    amount: number;
    savings: number;
    currency: string;
    error?: string;
}