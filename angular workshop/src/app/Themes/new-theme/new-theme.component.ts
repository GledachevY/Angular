import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Theme } from 'src/app/models/theme';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css']
})
export class NewThemeComponent implements OnInit {

  constructor(
    private themesService: ThemesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(form.valid){
      const themeName = form.value.themeName;
      const themeText = form.value.postText;
      
      this.themesService.postNewTheme(themeName, themeText).subscribe((resData: Theme) => {
        this.router.navigate(['/themes', resData._id]);
      })
    }
  }

  onCancel(){
    this.router.navigate(['/welcome']);
  }
}
