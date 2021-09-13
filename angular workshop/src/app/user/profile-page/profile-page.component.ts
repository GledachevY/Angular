import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: User;
  isEditMode = false;
  userSubs: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userSubs = this.userService.userListener.subscribe((userData) => {
      this.user = userData;
    });
    this.user = this.userService.user;
  }

  onEdit(editForm: NgForm){
    if(editForm.valid){
      const username = editForm.value.username;
      const email = editForm.value.email;
      const tel = editForm.value.tel;
      console.log(username, email, tel);
      this.userService.editUser(username, email, tel).subscribe(() => {
        this.onChangeMode();
      })
    }
  }

  onChangeMode(){
    this.isEditMode = !this.isEditMode
  }

  ngOnDestroy(): void {
    if(this.userSubs){
      this.userSubs.unsubscribe();
    }
  }
}
