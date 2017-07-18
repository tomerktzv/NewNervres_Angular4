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
  }

}
