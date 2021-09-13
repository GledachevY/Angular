import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "../models/post";
import { Theme } from "../models/theme";

@Injectable()
export class ThemesService {
    themes: Theme[] = [];
    lastPosts: Post[];
    themesChanged = new Subject<Theme[]>();
    lastPostsChanged = new Subject<Post[]>();

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    getThemes() {

        if (this.themes.length === 0) {
            this.fetchThemes();
            this.themesChanged.next(this.themes.slice());
        } else {
            this.themesChanged.next(this.themes.slice());
        }
    }

    fetchThemes() {
        this.http.get<Theme[]>('http://localhost:3000/api/themes')
            .subscribe(response => {
                this.themes = response;
                this.themesChanged.next(this.themes.slice());
            });

    }

    fetchCurrentTheme(id: string) {
        return this.http.get<Theme>('http://localhost:3000/api/themes/' + id)
    }

    fetchLastPosts() {
        this.http
            .get<Post[]>('http://localhost:3000/api/posts?limit=5')
            .subscribe(response => {
                this.lastPosts = response;
                this.lastPostsChanged.next(this.lastPosts.slice());
            });
    }

    postNewTheme(themeName: string, themeText: string) {
        return this.http.post(
            'http://localhost:3000/api/themes',
            {
                themeName: themeName,
                postText: themeText
            },
            {
                withCredentials: true
            }
        ).pipe(
            tap(() => {
                this.fetchThemes();
            })
        )

    }

    subscribeUser() {
        this.fetchThemes();
    }

    unSubscribeUser(userId: string, themeId: string) {
        //TODO
    }


    likeComment(postId: string) {
        return this.http.put(
            'http://localhost:3000/api/likes/' + postId,
            {

            },
            { withCredentials: true }
        ).pipe(
            tap(() => {
                this.themesChanged.next(this.themes.slice());
            }
            )
        )
    }

    dislikeComment(themeId: string, postId: string) {
        //TODO
    }
}