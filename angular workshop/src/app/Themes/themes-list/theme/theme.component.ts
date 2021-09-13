import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Theme } from 'src/app/models/theme';
import { User } from 'src/app/models/user';
import { ThemesService } from 'src/app/services/themes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit, OnDestroy {
  @Input() theme: Theme;
  user: User;
  userSubs: Subscription;
  themesSubs: Subscription;
  isThisUserSubscribed: boolean;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.userSubs = this.userService.userListener.subscribe((user) => {
      this.user = user;
    })

    if(this.user){
      this.isUserSubscribedToTheme();
    }
  }

  isUserSubscribedToTheme() {
  this.isThisUserSubscribed = this.theme.subscribers.some(s => s === this.user._id);
  }

  onClcik() {
    this.router.navigate(['/themes', this.theme._id]);
  }

  ngOnDestroy(): void {
    if(this.userSubs){
      this.userSubs.unsubscribe();
    }
  }

  onSubscribe() {
    this.userService.subscribeToTheme(this.theme);
  }

  onUnSubscribe() {
   //TODO
  }
}
