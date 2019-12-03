import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TransactionView } from './transaction'

@Component({
  selector: 'History',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  transaction_list = [new TransactionView( 'asd', 'dsa', 12, 2, 'huf' ),
                      new TransactionView( 'asd', 'dsa', 12, 2, 'huf' ),
                      new TransactionView( 'asd', 'dsa', 12, 2, 'huf' )]

  constructor(private userService: UserService) { }

  async ngOnInit() {
    /*
    var ret = await this.userService.getTransactions();
    ret.forEach(element => {
      var tr = new TransactionView( element["source_iban"].split(": ")[1], element["destination_iban"].split(": ")[1], element["amount"], element["savings"], element["currency"] )
      this.transaction_list.push(tr)
    });
    console.log(this.transaction_list)
    */
  }

}
