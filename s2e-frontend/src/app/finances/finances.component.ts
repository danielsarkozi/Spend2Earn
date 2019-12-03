import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../interfaces';

@Component({
  selector: 'Finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  private bankAccounts: BankAccount[] = [];

  constructor() { }

  ngOnInit() {
  }

}
