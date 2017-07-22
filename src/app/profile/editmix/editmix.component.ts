import { Component, OnInit } from '@angular/core';
import {sharedApiService} from "../../sharedServices/sharedServices";
import {MixesModule} from "../../sharedServices/mixes";
import {SongssModule} from "../../sharedServices/songs";
import {UsersModule} from "../../sharedServices/users";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-editmix',
  templateUrl: './editmix.component.html',
  styleUrls: ['./editmix.component.css']
})
export class EditmixComponent implements OnInit {

  mix:MixesModule;
  song:SongssModule[] = [];
  mixName:String;
  musicSrc:string = "https://veined-error.000webhostapp.com/pictures/";

  constructor(private service: sharedApiService, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params:Params)=>{
      let mixName = params['mixname'];
      let srv = this.service;
      let src = this.musicSrc;

      this.service.getSpecificMix(localStorage.getItem('username'),mixName)
        .subscribe(
          _mix=>{
            this.mix = _mix[0];
            let tempsongs = this.song;
            _mix[0].songs.forEach(function (temp) {
              srv.getSongById(temp)
                .subscribe(
                  _song=>{
                    let tempSrc = src+_song[0].id+"."+_song[0].title+".jpg";
                    tempsongs.push(new SongssModule(_song[0].artist,tempSrc,_song[0].duration,_song[0].genre,_song[0].id,_song[0].title));
                  }
                )
            })
          }
        )

    })

  }

}
