import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm){
    if(registerForm.valid){
      const username = registerForm.value.username;
      const email = registerForm.value.email;
      const telephone = 
      registerForm.value['select-tel'] + 
      registerForm.value.tel;
      const password = registerForm.value.password;
      const rePassword = registerForm.value.rePassword;

      if(password === rePassword){
        const user = new User(username, email, password, telephone);
        this.userService.registerUser(user).subscribe();
      }
    }
  }
}
