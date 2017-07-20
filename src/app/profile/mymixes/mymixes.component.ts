import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {sharedApiService} from "../../sharedServices/sharedServices";
import {MixesModule} from "../../sharedServices/mixes";
import {UsersModule, UsersModule2} from "../../sharedServices/users";
import {SongssModule} from "../../sharedServices/songs";


@Component({
  selector: 'app-mymixes',
  templateUrl: './mymixes.component.html',
  styleUrls: ['./mymixes.component.css']
})
export class MymixesComponent implements OnInit {

  songs: [string] = ['TEMP SONG', 'TEMP SONG', 'TEMP SONG', 'TEMP SONG', 'TEMP SONG'];
  mix:MixesModule;
  user:UsersModule2;
  mixSongs:number[]=[];
  songsList:SongssModule[] = [];

  constructor(private activatedRouter:ActivatedRoute, private service:sharedApiService) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params: Params)=>{
      let username = params['username'],
          mixname = params['mixname'];
      this.service.getUserDetails(username)
        .subscribe(
          _user=>{
            this.user = _user;
          },
          err=>{console.log(err)}
        );
      this.service.getSpecificMix(username,mixname)
        .subscribe(
          _mix=>{
            if(_mix === {}) console.log("not valid");
            else {
              this.mix = _mix;
              // console.log(_mix[0]);
              this.mixSongs = _mix[0].songs;
              let serv = this.service;
              let songTemp = this.songsList;

              // this.songsList.push(new SongssModule("","",2,"",2,""));
              // console.log(this.songsList);
              this.mixSongs.forEach(function (sg) {
                serv.getSongById(sg)
                  .subscribe(
                    _song =>{
                      console.log(_song[0]);
                      // songTemp.push(new SongssModule("","",2,"",2,""));
                      songTemp.push(new SongssModule(_song[0].artist,_song[0].cover,_song[0].duration,_song[0].genre,_song[0].id,_song[0].title));
                      console.log("--------");
                      console.log(songTemp);
                    },
                    err=>{console.log(err)}
                  )
              });
            }
          },
          err=>{console.log(err)}
        )

    })
  }

}
