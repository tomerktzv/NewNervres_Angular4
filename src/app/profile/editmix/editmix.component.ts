import { Component, OnInit } from '@angular/core';
import {sharedApiService} from "../../sharedServices/sharedServices";
import {MixesModule} from "../../sharedServices/mixes";
import {SongssModule} from "../../sharedServices/songs";
import {UsersModule} from "../../sharedServices/users";
import {ActivatedRoute, Params} from "@angular/router";
import {forEach} from "@angular/router/src/utils/collection";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-editmix',
  templateUrl: './editmix.component.html',
  styleUrls: ['./editmix.component.css']
})
export class EditmixComponent implements OnInit {

  mix:MixesModule;
  song:SongssModule[] = [];
  song2:SongssModule[] = [];
  arraySongId:number[] = [];
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
            let songid = this.arraySongId;
            _mix[0].songs.forEach(function (temp) {
              srv.getSongById(temp)
                .subscribe(
                  _song=>{
                    let tempSrc = src+_song[0].id+"."+_song[0].title+".jpg";
                    tempsongs.push(new SongssModule(_song[0].artist,tempSrc,_song[0].duration,_song[0].genre,_song[0].id,_song[0].title));
                    songid.push(_song[0].id);
                  }
                )
            })
          }
        )

    })
    setTimeout(()=>{
      this.getSongstoAdd();
    },1000);
  }

  getSongstoAdd(){
    this.service.getAllSongs()
      .subscribe(
        songstemp=>{
          this.song2 = songstemp;
          let temp = this.song2;
          let src = this.musicSrc;
          this.arraySongId.forEach(function (songTemp) {
            temp.forEach(function (t) {
              if(t.id === songTemp){
                let i = temp.indexOf(t);
                temp.splice(i,1);

              }
              else{
                t.cover = src+t.id+"."+t.title+".jpg";
              }
            })
          });

        }
      )

  }

  addSong(event,_id,_title,_artist){
    this.activatedRouter.params.subscribe((params:Params)=> {
      let mixName = params['mixname'];
      this.service.addSongtoMix(localStorage.getItem('username'),mixName,_id)
        .subscribe(
          temp=>{

          }
        )
    })
    this.song.push(new SongssModule(_artist,this.musicSrc+_id+"."+_title+".jpg",0," ",_id,_title));
    setTimeout(()=>{
      let tempSongs = this.song2;
      this.song2.forEach(function (temp) {
        if(temp.id==_id){
          let i = tempSongs.indexOf(temp);
          tempSongs.splice(i,1);
        }
      })
    },1000)
  }


  onHashMix(form:NgForm){
    if(form.value.hashtag!=="") {
      this.activatedRouter.params.subscribe((params: Params) => {
        let mixName = params['mixname'],
          username = localStorage.getItem('username'),
          hash = form.value.hashtag;
        console.log("HASH "+hash);
        this.service.addHashTag(username,mixName,hash)
          .subscribe()

      })
      this.mix.hashtags.push(form.value.hashtag);
    }
  }
}
