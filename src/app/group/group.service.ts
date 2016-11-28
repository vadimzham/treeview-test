import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Group } from './group';
import { TreeNode } from 'primeng/primeng';

@Injectable()
export class GroupService {
  // Change group URL here if needed.
  private groupUrl = 'http://localhost:4000/group';

  constructor (private http: Http) {}

  getGroup(group_id: number): Observable<Group> {
    return this.http.get(this.groupUrl + '/' + group_id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  changeGroup(group): Observable<Group> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // It's very bad idea to update data by POST request. This is a right way!
    return this.http.patch(this.groupUrl + '/' + group.id, {group_name: group.label}, options)
                    .map(this.extractData)
                    .catch(this.handleError);

    // This is a wrong way!
    // group = {
    //   group_id: group.id,
    //   group_name: group.label
    // };
    // return this.http.post(this.groupUrl, group, options)
    //                 .map(this.extractData)
    //                 .catch(this.handleError);


  }

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
