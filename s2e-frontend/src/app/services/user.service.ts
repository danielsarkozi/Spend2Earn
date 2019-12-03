import { Injectable } from '@angular/core';
import { Card, BankAccount, User, Transaction } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  public url: string;
  public token: string;

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

  public async getIbans(): Promise<BankAccount[]> {
    const response = await fetch('https://spend2earn.herokuapp.com/ibans/', {
      headers: {
        Authorization: `token ${this.token}`
      }
    });
    return await response.json();
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

}