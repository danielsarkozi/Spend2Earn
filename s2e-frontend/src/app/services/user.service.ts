import { Injectable } from '@angular/core';
import { Card, Iban } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  public url: string;
  public token: string;

  public async getDetails(): Promise<any> {
    const response = await fetch(this.url);
    return await response.json();
  }

  public async getIbans(): Promise<Iban[]> {
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

}