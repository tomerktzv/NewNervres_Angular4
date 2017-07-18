import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mymixes',
  templateUrl: './mymixes.component.html',
  styleUrls: ['./mymixes.component.css']
})
export class MymixesComponent implements OnInit {

  songs: [string] = ['TEMP SONG', 'TEMP SONG', 'TEMP SONG', 'TEMP SONG', 'TEMP SONG'];

  constructor() { }

  ngOnInit() {
  }

}
