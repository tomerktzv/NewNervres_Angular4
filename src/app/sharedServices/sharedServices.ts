/**
 * Created by tomerktzv on 15/07/2017.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {MixesModule} from './mixes';
import {UsersModule} from './users';
import {SongssModule} from './songs';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class sharedApiService {
  constructor(private http: Http) {}
  url: string = 'https://ordered-movies.herokuapp.com';

  //need to change
  getMix(): Observable<MixesModule[]>{
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getMUser(): Observable<UsersModule[]>{
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getAllSongs(): Observable<SongssModule[]>{
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //abstract function - no need to change
  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.genres || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);

  }
}
