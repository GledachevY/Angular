import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { strictEqual } from 'assert';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Theme } from 'src/app/models/theme';
import { User } from 'src/app/models/user';
import { ThemesService } from 'src/app/services/themes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-theme-comments',
  templateUrl: './theme-comments.component.html',
  styleUrls: ['./theme-comments.component.css']
})
export class ThemeCommentsComponent implements OnInit, OnDestroy {
  theme: Theme;
  user: User;
  userSubs: Subscription;
  themeSubs: Subscription;
  themeId: string = null;

  constructor(
    private userService: UserService,
    private themeService: ThemesService,
    private route: ActivatedRoute
  ) {
    this.themeId = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.userSubs = this.userService.userListener.subscribe((user) => {
      this.user = user;
    })
    
    let post = new Post(
      new Date(),
      [1],
      'default',
      'default',
      new Date(),
      this.user,
      'default'
    );
    this.theme = new Theme(new Date, [post], ['default'], new Date(), 'default', this.user, 'default')

    this.themeSubs = this.themeService.fetchCurrentTheme(this.themeId).subscribe((theme) => {
      this.theme = theme;
    })
  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
    if(this.themeSubs){
      this.themeSubs.unsubscribe();
    }
  }
}
