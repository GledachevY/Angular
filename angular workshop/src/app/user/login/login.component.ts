import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    console.log(this.loginForm);
    console.log(this.loginForm.controls.email.touched);
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log(email, password);

      this.userService.login(email, password).subscribe();
    }
  }

  private initForm(){
    let email = '';
    let password ='';

    this.loginForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl(password, [Validators.required, Validators.minLength(5)])
    })
  }
}
