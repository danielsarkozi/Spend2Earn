import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TransactionView } from './transaction';
import { SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";


@Component({
  selector: 'History',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private transaction_list = [];

  private filteredTransactions = [];

  private isLoading: boolean = true;

  private categories: string[] = ['All', 'Paid', 'Received'];

  private views: SegmentedBarItem[] = [];

  constructor(private userService: UserService) {
    for (let view of this.categories) {
      const item = new SegmentedBarItem();
      item.title = view;
      this.views.push(item);
    }
  }

  public onSelectedIndexChange(event) {
    switch(event.value) {
      case 1:
        this.filteredTransactions = this.transaction_list;
        break;
      case 2:
        this.filteredTransactions = this.transaction_list;
        break;
      default:
        this.filteredTransactions = this.transaction_list;
    }
  }

  async ngOnInit() {
    var ret = await this.userService.getTransactions();
    console.log(ret);
    this.isLoading = false;
    ret.forEach((element: any) => {
      var tr = new TransactionView( /*element["source_iban"].split(": ")[1], element["destination_iban"].split(": ")[1]*/ element["destination_account_owner"], element["destination_alias"], element["amount"], element["savings"], element["currency"], this.getColor(element["status"]))
      this.transaction_list.push(tr)
    });
    this.filteredTransactions = this.transaction_list;
  }

  private getColor(status: string): string {
    if (status === 'created') {
      return 'yellow';
    }
    else if (status.includes('denied')) {
      return 'red';
    }
    return 'lightseagreen';
  }

}
