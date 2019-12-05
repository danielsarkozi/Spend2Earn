import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = ''
  data = [
    { Month: "Jan", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
    { Month: "Feb", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
    { Month: "Mar", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
    { Month: "Apr", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
    { Month: "May", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
  ]

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    
  }

  gen_data(){
    for(var i = 0;i<10;i++){
      var temp = {Date : i+1, Amount: Math.floor((Math.random() * 20) + 5) - 5 }
      //this.data.push(temp)
    }
  }
}
 