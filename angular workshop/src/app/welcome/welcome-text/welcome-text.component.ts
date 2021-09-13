import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome-text',
  templateUrl: './welcome-text.component.html',
  styleUrls: ['./welcome-text.component.css']
})
export class WelcomeTextComponent implements OnInit, OnDestroy {
  user: User;
  userSubs: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.userSubs = this.userService.userListener.subscribe((user) => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

}
