import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  text = "You got 17$, nigga!"

  constructor() { }

  ngOnInit() {
  }

}
