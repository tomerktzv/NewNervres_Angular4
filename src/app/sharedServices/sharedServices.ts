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
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class sharedApiService {
  constructor(private http: Http) {}
  url: string = 'https://new-nerves.herokuapp.com';

  //need to change
  getMix(): Observable<MixesModule[]>{
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getUser(_username,_password): Observable<UsersModule>{
    return this.http.get(`${this.url}/getUserByIDAndPass/${_username}/${_password}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
//return this.http.post(this.apiURL,JSON.stringify({genre:_genre}))
  setNewUser(_username,_name,_about,_address,_password,_profilepic): Observable<UsersModule>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/addNewUser`,({name:_name,username:_username,about:_about,address:_address,userpassword:_password,profilepic:_profilepic}),options)
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
    console.log("Test body: "+body);
    return body || { };
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
