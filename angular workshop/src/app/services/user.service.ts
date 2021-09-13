import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "../models/post";
import { Theme } from "../models/theme";
import { User } from "../models/user";
import { ThemesService } from "./themes.service";

@Injectable()
export class UserService {
    public user: User;
    users: User[] = [new User('Gosho', 'goshkata@gmail.com', '1234', '089896486')];
    userListener = new BehaviorSubject<User>(null);

    constructor(
        private themesService: ThemesService,
        private http: HttpClient,
        private router: Router
    ) {

    }

    login(email: string, password: string) {
        return this.http
            .post<User>(
                'http://localhost:3000/api/login',
                {
                    'email': email,
                    'password': password
                },
                {
                    withCredentials: true,
                    observe: 'response' as 'response',
                }
            ).pipe(
                tap((resData) => {
                    this.handleAuthentication(resData, password)
                }).bind(this)
            );
    }

    registerUser(user: User) {
        return this.http.post<User>(
            'http://localhost:3000/api/register',
            {
                username: user.username,
                email: user.email,
                password: user.password,
                tel: user.tel
            },
            {
                observe: 'response' as 'response',
                withCredentials: true
            }
        )
            .pipe(catchError(error => {
                return throwError(error.error);
            }),
                tap((resData) => {
                    this.handleAuthentication(resData, user.password)
                }).bind(this)
            );
    }

    editUser(username: string, email: string, tel: string){
        return this.http.put<User>(
            'http://localhost:3000/api/users/profile',
            {
                "username": username,
                "email": email,
                "tel": tel
            },
            {
                withCredentials: true
            }
        ).pipe(
            tap((data) => {
                this.user = data
                this.userListener.next(this.user);
            })
        )
    }

    handleAuthentication(resData, pass) {
        this.user = resData.body;
        this.user.password = pass;
        this.userListener.next(this.user);
        localStorage.setItem('userData', JSON.stringify(this.user));
        this.router.navigate(['/welcome']);
    }

    autoLogin() {
        const loggedUser: {
            username: string;
            email: string;
            tel: string;
            _id: string;
            posts: Post[];
            themes: Theme[];
            crated_at: Date;
            password: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!loggedUser) {
            return;
        }

        if (!this.doesHttpOnlyCookieExist('auth-cookie')) {
            this.login(loggedUser.email, loggedUser.password).subscribe();
        } else {
            this.user = loggedUser;
            this.userListener.next(this.user);
        }

    }

    private doesHttpOnlyCookieExist(cookiename) {
        var d = new Date();
        d.setTime(d.getTime() + (1000));
        var expires = "expires=" + d.toUTCString();

        document.cookie = cookiename + "=new_value;path=/;" + expires;
        return document.cookie.indexOf(cookiename + '=') == -1;
    }

    logout() {
        return this.http
            .post(
                'http://localhost:3000/api/logout',
                {},
                {
                    withCredentials: true
                }
            )
            .pipe(
                tap(() => {
                    this.router.navigate(['/register']);
                })
            )
            .subscribe(() => {
                localStorage.removeItem('userData');
                this.user = null;
                this.userListener.next(this.user);
            })
    }

    subscribeToTheme(theme: Theme) {
        this.http
            .put(
                'http://localhost:3000/api/themes/' + theme._id,
                {},
                {
                    withCredentials: true
                }
            ).subscribe(() => {
                this.themesService.subscribeUser();
            });
    }

    test() {

    }

    unSubscribeToTheme(theme: Theme) {
        //TODO
    }
}