import { Component, OnInit } from '@angular/core';
import {UsersModule} from "../sharedServices/users";
import {UserService} from "../sharedServices/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public client:UserService) { }

  ngOnInit() {
    this.client.userData.username = localStorage.getItem("username");
    this.client.userData.name = localStorage.getItem("name");
    this.client.userData.address = localStorage.getItem("address");
    this.client.userData.about = localStorage.getItem("about");
    this.client.userData.profilepic = localStorage.getItem("profilepic");
    this.client.userData.userpassword = localStorage.getItem("userpassword");

  }

}
