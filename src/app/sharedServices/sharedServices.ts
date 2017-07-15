/**
 * Created by tomerktzv on 15/07/2017.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class sharedApiService {
  constructor(private http: Http) {}
  url: string = 'https://ordered-movies.herokuapp.com';


}
