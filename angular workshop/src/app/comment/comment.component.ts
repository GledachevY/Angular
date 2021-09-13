import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../models/post';
import { Theme } from '../models/theme';
import { User } from '../models/user';
import { ThemesService } from '../services/themes.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  themeId: string;
  theme: Theme;
  user: User;
  themesSubs: Subscription;

  constructor(
    private themesService: ThemesService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.themeId = this.post.themeId;

    this.user = this.userService.user;
    this.userService.userListener.subscribe((user) => {
      this.user = user;
    })
  }

  onLiked() {
    this.themesService.
      likeComment(this.post._id).subscribe((result) => console.log(result));

    this.themesSubs = this.themesService.themesChanged.subscribe(() => {
      this.themesService.fetchCurrentTheme(this.themeId).subscribe((resData) => {
        this.post = resData.posts.find(p => p._id === this.post._id);
      })
    })
  }

  onDisliked() {
    // TODO
  }
  ngOnDestroy(): void {
    if(this.themesSubs){
      this.themesSubs.unsubscribe();
    }
  }
}
