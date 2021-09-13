import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NewThemeComponent } from "./Themes/new-theme/new-theme.component";
import { ThemeCommentsComponent } from "./Themes/theme-comments/theme-comments.component";
import { ThemesListComponent } from "./Themes/themes-list/themes-list.component";
import { LoginComponent } from "./user/login/login.component";
import { ProfilePageComponent } from "./user/profile-page/profile-page.component";
import { RegisterComponent } from "./user/register/register.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'welcome', component: WelcomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'themes', component: ThemesListComponent},
    { path: 'themes/:id', component: ThemeCommentsComponent},
    { path: 'add-theme', component: NewThemeComponent, canActivate: [AuthGuard]},
    { path: 'not-found', component: NotFoundComponent},
    { path: "**", redirectTo: 'not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }