import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { apiUrl } from '../../util/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {
  private userCache: { [page: number]: any } = {};
  constructor(private _httpClient: HttpClient) { }

  getPaginatedUsers(page: number): Observable<any> {
    if (this.userCache[page]) {
      return of(this.userCache[page]);
    } else {
      return this._httpClient.get(`${apiUrl}/users?page=${page}`).pipe(
        tap((data) => {
          this.userCache[page] = data;
        })
      );
    }
  }
}
