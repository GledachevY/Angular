import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Theme } from 'src/app/models/theme';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.css']
})
export class ThemesListComponent implements OnInit, OnDestroy {
  themes: Theme[];
  themeSubscription: Subscription;
  postsSubscription: Subscription;
  lastPosts: Post[];

  constructor(private themesService: ThemesService) { }


  ngOnInit(): void {
    this.themeSubscription = this.themesService.themesChanged.subscribe((themes: Theme[]) => {
      this.themes = themes;
    })

    this.themesService.getThemes();
    this.themesService.fetchLastPosts();
    this.postsSubscription = this.themesService.lastPostsChanged.subscribe((posts) => {
      this.lastPosts = posts;
    })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
  }
}
