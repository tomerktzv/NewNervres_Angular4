/**
 * Created by Nir Mekin on 7/18/2017.
 */


import {Injectable} from "@angular/core";
import {UsersModule} from "./users";

@Injectable()
export class UserService{
   userData = new UsersModule("","","","","","");
   userStatus:boolean = false;

}

