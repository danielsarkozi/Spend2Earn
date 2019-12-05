import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'Finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  private bankAccounts: BankAccount[] = [];

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.bankAccounts = await this.userService.getIbans(true);
  }

}
