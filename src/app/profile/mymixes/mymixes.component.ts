import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {sharedApiService} from "../../sharedServices/sharedServices";
import {MixesModule} from "../../sharedServices/mixes";
import {UsersModule, UsersModule2} from "../../sharedServices/users";
import {SongssModule} from '../../sharedServices/songs';


@Component({
  selector: 'app-mymixes',
  templateUrl: './mymixes.component.html',
  styleUrls: ['./mymixes.component.css']
})
export class MymixesComponent implements OnInit {

  @ViewChild('player') musicPlayer;
  mix: MixesModule;
  user: UsersModule2;
  mixSongs: number[] = [];
  songsList: SongssModule[] = [];
  musicSrc = 'https://veined-error.000webhostapp.com/';
  buttonPlayer = 'playButton.png';
  src: string;
  songPlay: string[] = [];

  constructor(private activatedRouter: ActivatedRoute, private service: sharedApiService, public element: ElementRef) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params: Params) => {
      let username = params['username'],
          mixname = params['mixname'];
      this.service.setAddHeard(username,mixname)
        .subscribe();
      this.service.getUserDetails(username)
        .subscribe(
          _user => {
            this.user = _user;
          },
          err => {
            console.log(err);
          });
      this.service.getSpecificMix(username, mixname)
        .subscribe(
          _mix => {
            if (_mix === {}) console.log('not valid');
            else {
              this.mix = _mix;
              this.mixSongs = _mix[0].songs;
              let serv = this.service;
              let songTemp = this.songsList;

              this.mixSongs.forEach(function (sg) {
                serv.getSongById(sg)
                  .subscribe(
                    _song => {
                      songTemp.push(new SongssModule(_song[0].artist, _song[0].cover, _song[0].duration, _song[0].genre, _song[0].id, _song[0].title));
                    },
                    err => {
                      console.log(err);
                    });
              });
            }
          },
          err => {
            console.log(err);
          });
    });
    setTimeout(()=>{
      this.songPlay[3]=this.musicSrc+"pictures/"+this.songsList[0].id+"."+this.songsList[0].title+".jpg";
    },2000)
    // setTimeout(()=>{
    //   this.songPlay[3]=this.musicSrc+"pictures/"+this.songsList[0].id+"."+this.songsList[0].title+".jpg";
    //   this.musicPlay('click',0);
    // },2000)

  }

  getDurtaion(_duration){
    let duration = _duration/60;
    let min = Math.floor(duration);
    let sec = ((100*duration)%100)*0.6;
    sec = Math.floor(sec);

    let mixDuration:string;

    if(min>=10) mixDuration = `${min}:`;
    else mixDuration = `0${min}:`;

    if(sec>=10) mixDuration+=`${sec}`;
    else mixDuration+=`0${sec}`;
    return mixDuration;
  }


  musicPlay(event,_index) {
    this.songPlay[0] = this.songsList[_index].title;
    this.songPlay[1] = this.songsList[_index].genre;
    this.songPlay[2] = this.songsList[_index].artist;
    this.songPlay[3]= this.musicSrc+"pictures/"+this.songsList[_index].id+"."+this.songsList[_index].title+".jpg"
    this.src = this.musicSrc+"songs/"+this.songsList[_index].id+"."+this.songsList[_index].title+".mp3";
    setTimeout(()=>{
      let playPromise = this.musicPlayer.nativeElement.play();
      this.buttonPlayer="pauseButton.png";

      if (playPromise !== undefined) {
        playPromise.then(_ => {
        }).catch(error => {});
      }
    },500)

  }

  checkStatusPlayer(event){
    if(this.buttonPlayer==="pauseButton.png"){
      this.buttonPlayer="playButton.png";
      this.musicPlayer.nativeElement.pause();
    }
    else{
      this.buttonPlayer="pauseButton.png";
      this.musicPlayer.nativeElement.play();
    }
  }
}
