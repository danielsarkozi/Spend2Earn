import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TransactionView } from '../history/transaction';

@Component({
  selector: 'Statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  data = [
    { Month: "Jan", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
    { Month: "Feb", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
    { Month: "Mar", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
    { Month: "Apr", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
    { Month: "May", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
  ]

  transaction_list = []

  savings = 0

  constructor( private userService: UserService ) { }

  async ngOnInit() {
    var ret = await this.userService.getTransactions();
    ret.forEach(element => {
      var tr = new TransactionView( element["source_iban"].split(": ")[1], element["destination_iban"].split(": ")[1], element["amount"], element["savings"], element["currency"] )
      this.savings = this.savings + element["savings"]
      this.transaction_list.push(tr)
    });
    console.log(this.transaction_list)
    

  }

}
