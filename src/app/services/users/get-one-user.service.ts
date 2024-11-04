import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { apiUrl } from '../../util/apiUrl';

@Injectable({
  providedIn: 'root',
})
export class GetOneUserService {
  private userByIdCache: { [key: string]: any } = {}; 

  constructor(private _httpClient: HttpClient) {}

  getUserById(id: string): Observable<any> {
    if (this.userByIdCache[id]) {
      return of(this.userByIdCache[id]);
    } else {
      return this._httpClient.get(`${apiUrl}/users/${id}`).pipe(
        tap(data => {
          this.userByIdCache[id] = data;
        })
      );
    }
  }
}
