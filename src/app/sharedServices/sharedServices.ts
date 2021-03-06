/**
 * Created by tomerktzv on 15/07/2017.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {MixesModule, MixesModuleNew, MixesAddHeard, MixesAddSong, MixesAddHashtag} from './mixes';
import {UsersModule, UsersModule2} from './users';
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
  getMix(_username): Observable<MixesModule[]>{
    return this.http.get(`${this.url}/getMixesByUserID/${_username}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSpecificMix(_username,_mixName): Observable<MixesModule>{
    return this.http.get(`${this.url}/getMixesByUsernameAndMixname/${_username}/${_mixName}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUserDetails(_username): Observable<UsersModule2>{
    return this.http.get(`${this.url}/getUsersDetails/${_username}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUser(_username,_password): Observable<UsersModule>{
    return this.http.get(`${this.url}/getUserByIDAndPass/${_username}/${_password}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  setNewUser(_username,_name,_about,_address,_password,_profilepic): Observable<UsersModule>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/addNewUser`,({name:_name,username:_username,about:_about,address:_address,userpassword:_password,profilepic:_profilepic}),options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  setNewMix(_username,_mixname,_mixcover): Observable<MixesModuleNew>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/addNewMix`,({username:_username,mixname:_mixname,mixcover:_mixcover}),options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllSongs(): Observable<SongssModule[]>{
    return this.http.get(this.url+"/getAllSongs")
      .map(this.extractData)
      .catch(this.handleError);
  }

  addSongtoMix(_username,_mixname,_songid): Observable<MixesAddSong>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/addSongToMix`,({username:_username,mixname:_mixname,songid:_songid}),options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSongById(_id): Observable<SongssModule>{
    return this.http.get(`${this.url}/getSongByID/${_id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  setAddHeard(_username,_mixname): Observable<MixesAddHeard>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/incHeardFromMix`,({username:_username,mixname:_mixname}),options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  addHashTag(_username,_mixname,_hashtag): Observable<MixesAddHashtag>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/addHashTagToMix`,({username:_username,mixname:_mixname,hashtag:_hashtag}),options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  //abstract function - no need to change
  private extractData(res: Response) {
    let body = res.json();
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
