import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from "../sharedServices/user.service";
import {Router} from "@angular/router";


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



  constructor(private client:UserService,private router:Router) {}

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
    }
  }

  onSubmited(form:NgForm){
    if(this.client.userData.username === form.value.username && this.client.userData.password === form.value.userpassword)
      this.router.navigate(['/profile']);
    else this.viewWorning= true;
  }
  onSignIn(form:NgForm){
    this.client.userData.username = form.value.username;
    this.client.userData.name = form.value.name;
    this.client.userData.password = form.value.userpassword;
    this.client.userData.about = form.value.userabout;
    this.client.userData.address = form.value.useraddress;
    this.client.userData.profilepic = form.value.picP;
  }

}
