import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces';

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: User = {
    username: 'Fake Data',
    email: 'Email',
    password: 'PW',
    pin: 'PIN'
  };

  constructor() { }

  ngOnInit() {
  }

}
