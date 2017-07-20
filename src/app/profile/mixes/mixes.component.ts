import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {MixService} from "../../sharedServices/mix.service";
import {sharedApiService} from "../../sharedServices/sharedServices";
import {MixesModule} from "../../sharedServices/mixes";

@Component({
  selector: 'app-mixes',
  templateUrl: './mixes.component.html',
  styleUrls: ['./mixes.component.css']
})
export class MixesComponent implements OnInit {

  comments: [string] = [ 'Great tracks!', 'Thanks a lot', 'not bad at all' ];

  mixes:MixesModule[];

  constructor(private service:sharedApiService) { }

  ngOnInit() {
    this.service.getMix(localStorage.getItem("username"))
      .subscribe(
        _mixs=>{
            this.mixes = _mixs;
            this.mixes.forEach(function (tempMix) {
              console.log(tempMix);
            })
        },
        err=>{
          console.log("Error: "+err);
        }
      )
  }

  test() {
    console.log('test');
  }



}
