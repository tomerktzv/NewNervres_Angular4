import { Component, OnInit ,EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-mixes',
  templateUrl: './mixes.component.html',
  styleUrls: ['./mixes.component.css']
})
export class MixesComponent implements OnInit {

  comments:[string] = ["Great tracks!","Thanks a lot","not bad at all"];

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log('test');
  }



}
