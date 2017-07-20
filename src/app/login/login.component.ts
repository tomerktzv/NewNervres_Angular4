import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from "../sharedServices/user.service";
import {Router} from "@angular/router";
import {sharedApiService} from "../sharedServices/sharedServices";
import {UsersModule} from "../sharedServices/users";
import {isUndefined} from "util";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  displayLoginStatus:boolean = false;
  displayLightBox:boolean = false;
  displaySignIn:boolean = false;
  tempData:boolean = true ;
  viewWorning:boolean = false;
  displayWorning:boolean = false;
  user:UsersModule;



  constructor(private client:UserService,private router:Router,private service:sharedApiService) {}

  ngOnInit() {
  }
  changeStatusLogin(event){

    this.onSubmited(event);
  }
  changeStatusSingIn(event){
    if(!this.displaySignIn) {
      this.displayLightBox = true;
      this.displaySignIn = true;
    }
    else{
      this.displayLightBox = false;
      this.displaySignIn = false;
      this.displayWorning=false;
    }

  }

  onSubmited(form:NgForm){
    this.service.getUser(form.value.username,form.value.userpassword)
      .subscribe(
        _user=>{
          if(isUndefined(_user[0]))
            this.viewWorning= true;
          else {
            this.client.setUserData(_user[0]);
            this.router.navigate(['/profile']);
          }
          console.log(_user[0]);
        },
        err=>{
          this.viewWorning= true;
          console.log(err);
        }
      )
  }
  onSignIn(form:NgForm){
    if( form.value.username===""      ||
        form.value.name===""          ||
        form.value.userpassword===""  ||
        form.value.useraddress===""   ||
        form.value.userabout==="") this.displayWorning=true;
    else {
      this.service.setNewUser(form.value.username, form.value.name, form.value.userabout, form.value.useraddress, form.value.userpassword, form.value.picP)
        .subscribe(
          _newUser => {
            console.log("New User \n" + _newUser);
            this.changeStatusSingIn(event);
          },
          err => {
            console.log("error - " + err);
          }
        )
    }
  }



}
