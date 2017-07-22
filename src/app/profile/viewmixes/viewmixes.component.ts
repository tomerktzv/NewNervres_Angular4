import { Component, OnInit } from '@angular/core';
import {MixesModule} from "../../sharedServices/mixes";
import {sharedApiService} from "../../sharedServices/sharedServices";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-viewmixes',
  templateUrl: './viewmixes.component.html',
  styleUrls: ['./viewmixes.component.css']
})
export class ViewmixesComponent implements OnInit {
  mixes:MixesModule[];

  constructor(private service:sharedApiService) { }

  ngOnInit() {
    this.initialMix();
  }

  initialMix(){
    this.service.getMix(localStorage.getItem("username"))
      .subscribe(
        _mixs=>{
          this.mixes = _mixs;
          console.log(_mixs);
        },
        err=>{
          console.log("Error: "+err);
        }
      )
  }

  onEnterMix(form:NgForm){
    let urname = localStorage.getItem("username"),
      mixname = form.value.mname,
      mixcover = form.value.coverPic;

    this.service.setNewMix(urname, mixname, mixcover)
      .subscribe(
        mix=>{
          console.log("Print New Mix Message: "+mix);
          this.initialMix();
        }
      )
  }

}
