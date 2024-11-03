import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../util/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(private _httpClient: HttpClient) { }

  getPaginatedUsers(page : number): Observable<any> {
    return this._httpClient.get(`${apiUrl}/users?page=${page}`)
  }
}
