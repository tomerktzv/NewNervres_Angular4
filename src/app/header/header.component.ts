import { Component, OnInit } from '@angular/core';
import {UserService} from "../sharedServices/user.service";
import {isUndefined} from "util";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private client:UserService) { }

  ngOnInit() {
    if(isUndefined(localStorage.getItem("username")))
      this.client.userData.username = "";
    else this.client.userData.username = localStorage.getItem("username");
  }

}
