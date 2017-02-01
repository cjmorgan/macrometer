import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IdService {

  constructor(private http: Http) {}

  private headers = new Headers({'Content-Type': 'application/json'});
  private messageEndpoint = 'api/id';

  getMessage(): Promise<String> {
    return this.http.get(this.messageEndpoint)
                .toPromise()
                .then((response) => {
                  return response.json().message as String
                })
                .catch(this.handleError);
  }

  private handleError(error:any): Promise<any> {
    console.error(`Error in message servce: ${error}`);
    return Promise.reject(error.message || error);
  }
}