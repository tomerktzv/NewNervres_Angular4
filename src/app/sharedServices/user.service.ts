/**
 * Created by Nir Mekin on 7/18/2017.
 */


import {Injectable } from "@angular/core";
import {UsersModule} from "./users";

@Injectable()
export class UserService{
   userData:UsersModule = new UsersModule("","","","","","");
   //userStatus:boolean = false;

   setUserData(user) {
     localStorage.setItem('username',user.username);
     localStorage.setItem('name',user.name);
     localStorage.setItem('profilepic',user.profilepic);
     localStorage.setItem('about',user.about);
     localStorage.setItem('address',user.address);
     localStorage.setItem('userpassword',user.userpassword);
   }

}

