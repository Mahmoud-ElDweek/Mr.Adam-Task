import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../util/apiUrl';

@Injectable({
  providedIn: 'root',
})
export class GetOneUserService {
  constructor(private _httpClient: HttpClient) {}

  getUserById(id: number): Observable<any> {
    return this._httpClient.get(`${apiUrl}/users/${id}`);
  }
}
