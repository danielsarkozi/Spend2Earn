import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: User = {
    email: '',
    password: '',
    pin: ''
  };

  private isLoading: boolean = true;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.user.email = await this.userService.getEmail();
    this.isLoading = false;
  }

}
