import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ThemesListComponent } from './Themes/themes-list/themes-list.component';
import { ThemeComponent } from './Themes/themes-list/theme/theme.component';
import { SortBySubscribersPipe } from './pipes/sort-by-subscribers.pipe';
import { LastPostsComponent } from './Themes/last-posts/last-posts.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ThemeCommentsComponent } from './Themes/theme-comments/theme-comments.component';
import { HeaderComponent } from './header/header.component';
import { CommentComponent } from './comment/comment.component';
import { AnswerComponent } from './answer/answer.component';
import { WelcomeTextComponent } from './welcome/welcome-text/welcome-text.component';
import { NewThemeComponent } from './Themes/new-theme/new-theme.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserService } from './services/user.service';
import { ThemesService } from './services/themes.service';
import { CookieService } from 'ngx-cookie-service';
import { GetDaysPipe } from './pipes/get-days.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ThemesListComponent,
    ThemeComponent,
    SortBySubscribersPipe,
    LastPostsComponent,
    ProfilePageComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
    ThemeCommentsComponent,
    HeaderComponent,
    CommentComponent,
    AnswerComponent,
    WelcomeTextComponent,
    NewThemeComponent,
    NotFoundComponent,
    GetDaysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UserService, ThemesService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
