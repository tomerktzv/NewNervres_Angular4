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
    if(!this.displayLoginStatus) {
      this.displayLightBox = true;
      this.displayLoginStatus = true;
    }
    else{
      this.displayLightBox = false;
      this.displayLoginStatus = false;
      this.viewWorning = false;
    }
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
            this.user = _user;
            this.client.userData.username = this.user[0].username;
            this.client.userData.name = this.user[0].name;
            this.client.userData.userpassword = this.user[0].userpassword;
            this.client.userData.about = this.user[0].about;
            this.client.userData.address = this.user[0].address;
            this.client.userData.profilepic = this.user[0].profilepic;
            this.router.navigate(['/profile']);
          }
          console.log(this.user);
        },
        err=>{
          this.viewWorning= true;
          console.log(err);
        }
      )
  }
  onSignIn(form:NgForm){
    // this.client.userData.username = form.value.username;
    // this.client.userData.name = form.value.name;
    // this.client.userData.userpassword = form.value.userpassword;
    // this.client.userData.about = form.vaform.value.namelue.userabout;
    // this.client.userData.address = form.value.useraddress;
    // this.client.userData.profilepic = form.value.picP;
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
