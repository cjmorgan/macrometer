import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {mockFood} from '../mock/food.mock';

@Injectable()
export class FoodService {

  constructor(private http: Http) {}

  private headers = new Headers({'Content-Type': 'application/json'});
  private foodEndpoint = 'api/food';

  getFood(): Promise<any> {
    return Promise.resolve(mockFood);
  }

  private handleError(error:any): Promise<any> {
    console.error(`Error in message servce: ${error}`);
    return Promise.reject(error.message || error);
  }
}
