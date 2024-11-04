import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { apiUrl } from '../../util/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class SearchUserByIdService {

  private foundedUserCache : { [key : string] : any} = {}

  constructor(private _httpClient: HttpClient) { }

  searchUserById(id : string): Observable<any> {
    if(this.foundedUserCache[id]){
      return of(this.foundedUserCache[id]);
    }else {
      return this._httpClient.get(`${apiUrl}/users/${id}`).pipe(
        tap(data =>{
          this.foundedUserCache[id] = data;
        })
      )
    }
  }
}
