import BankAccount from './bank-account.interface';
import CardListItem from './card-list-item.interface';
import ListItem from './list-item.interface';

export default interface BankAccountListItem extends BankAccount, ListItem {
    cards: CardListItem[]
}