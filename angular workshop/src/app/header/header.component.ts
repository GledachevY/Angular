import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User;
  userSubs: Subscription;

  constructor(
    private userService: UserService
    ){}

  ngOnInit(): void {
    this.userSubs = this.userService.userListener.subscribe((user) => {
      this.user = user;
    })
    this.userService.autoLogin();
  }

  onLogout(){
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
