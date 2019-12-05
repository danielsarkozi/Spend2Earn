import { Injectable } from '@angular/core';
import { Card, BankAccount, User, Transaction } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  public url: string;
  public token: string = 'fa9344624776efcdfd6360481d3f613d8a74285d';

  public async register(user: User): Promise<object> {
    const { username, password, email, pin } = user;
    const response = await fetch('https://spend2earn.herokuapp.com/customusers/', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        email,
        pin
      })
    });

    let userData;
    if(response.ok) {
      userData = await response.json();
      this.url = userData.url;
    }

    return userData;
  }

  public async logIn(email: string, password: string): Promise<boolean> {
    const response = await fetch('https://spend2earn.herokuapp.com/api-token-auth/', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password
      })
    });

    if(response.ok) {
      const { token } = await response.json();
      this.token = token;
    }
    else {
      response.text().then(console.error);
    }

    return response.ok;
  }

  public async getDetails(): Promise<any> {
    const response = await fetch(this.url);
    return await response.json();
  }

  public async getIbans(withCards: boolean = false): Promise<BankAccount[]> {
    const response = await fetch('https://spend2earn.herokuapp.com/ibans/', {
      headers: {
        Authorization: `token ${this.token}`
      }
    });

    if(!response.ok) {
      response.text().then(console.error);
      return [];
    }

    let rawBankAccounts = await response.json();

    if(withCards) {
      let rawCards: any = await this.getCards();
      rawCards.forEach(rawCard => {
        let card: Card = {
          number: rawCard.number,
          alias: rawCard.alias
        };

        let account = rawBankAccounts.find(rawBankAccount => rawBankAccount.url === rawCard.iban);
        if(account.cards) {
          account.cards.push(card);
        }
        else {
          account.cards = [ card ];
        }
      });
    }
    
    const bankAccounts: BankAccount[] = rawBankAccounts.map(rawBankAccount => ({
      url: rawBankAccount.url,
      accountOwner: rawBankAccount.account_owner,
      alias: rawBankAccount.alias,
      number: rawBankAccount.country + rawBankAccount.check_digit + rawBankAccount.number,
      currency: rawBankAccount.currency,
      cards: rawBankAccount.cards || []
    }));

    return bankAccounts;
  }

  public async getCards(): Promise<Card[]> {
    const response = await fetch('https://spend2earn.herokuapp.com/cards/', {
      headers: {
        Authorization: `token ${this.token}`
      }
    });
    return await response.json();
  }

  public async getTransactions(): Promise<Transaction[]> {
    const response = await fetch('https://spend2earn.herokuapp.com/transactions/', {
      headers: {
        Authorization: `token ${this.token}`
      }
    });
    return await response.json();
  }

  public async createTransaction(destination: string, amount: number, savings: number, currency: string, source: string): Promise<string> {
    const response = await (fetch('https://spend2earn.herokuapp.com/transactions/', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${this.token}`
      },
      body: JSON.stringify({
        destination_iban: destination,
        amount,
        savings: savings.toFixed(2),
        currency,
        source_card: source
      })
    }).then(response => response.text()));

    let returnValue;

    if(response === 'OK this was a regular POS transaction') {
      returnValue = null;
    }
    else {
      returnValue = JSON.parse(response);
    }

    console.log(response, returnValue);

    return returnValue;
  }

  public async approveTransaction(transaction: string, pin: string): Promise<any> {
    return await this.updateTransaction(transaction, 'approved_by_payer', pin);
  }

  public async denyTransaction(transaction: string, pin: string): Promise<any> {
    return await this.updateTransaction(transaction, 'denied_by_payer', pin);
  }

  private async updateTransaction(transaction: string, status: string, pin: string): Promise<any> {
    const response = await fetch('https://spend2earn.herokuapp.com/validation/', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${this.token}`,
        pin
      },
      body: JSON.stringify({
        new_status: status,
        subject_transaction: transaction,
      })
    });

    response.text().then(console.log);

    return response;
  }

}