import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs'

export interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  review: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'https://eshan-test-default-rtdb.firebaseio.com/users.json'
  constructor(private _http: HttpClient) { }

  addUser(formData: any): Observable<IUser[]> {
    return this._http.post<IUser[]>(this.url, formData);
  }

  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this.url)
      .pipe(
        map((res: any) => {
          return Object.keys(res).map((key) => ({
            ...res[key],
            id: key
          }))
        })
      );
  }

  updateUser(id: string, formData: any): Observable<IUser[]> {
    return this._http.put<IUser[]>(`https://eshan-test-default-rtdb.firebaseio.com/users/${id}.json`, formData)
  }

  deleteUser(id: string): Observable<IUser> {
    return this._http.delete<IUser>(`https://eshan-test-default-rtdb.firebaseio.com/users/${id}.json`)
  }

  getUserById(id: string): Observable<IUser> {
    return  this._http.get<IUser>(`https://eshan-test-default-rtdb.firebaseio.com/users/${id}.json`)
  }
}
