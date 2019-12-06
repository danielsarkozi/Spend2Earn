import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TransactionView } from './transaction'

@Component({
  selector: 'History',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  transaction_list = []

  constructor(private userService: UserService) { }

  async ngOnInit() {
    var ret = await this.userService.getTransactions();
    ret.forEach((element: any) => {
      var tr = new TransactionView( /*element["source_iban"].split(": ")[1], element["destination_iban"].split(": ")[1]*/ element["destination_account_owner"], element["destination_alias"], element["amount"], element["savings"], element["currency"], this.getColor(element.status))
      this.transaction_list.push(tr)
    });
    console.log(this.transaction_list)
  }

  private getColor(status: string): string {
    if(status === 'created') {
      return 'yellow';
    }
    else if(status.includes('denied')) {
      return 'red';
    }
    return 'lightseagreen';
  }

}
