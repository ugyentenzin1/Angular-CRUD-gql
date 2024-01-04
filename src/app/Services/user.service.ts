import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, map, tap, mapTo} from 'rxjs'
import {CREATE_USERS, GET_USERS} from "../graphql.operations";
import {Apollo} from "apollo-angular";
import {CoreService} from "./core.service";

export interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  review: string;
}

interface Users {
  gender: string,
  phone: number,
  username: string,
  email: string,
  website: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'https://eshan-test-default-rtdb.firebaseio.com/users.json'
  constructor(private _http: HttpClient , private apollo: Apollo,
             private coreService: CoreService) { }

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


  getUser():Observable<any> {
    return this.apollo.query({
      query: GET_USERS,
      variables: {},
      fetchPolicy: 'no-cache'
    }).pipe(map(val => val.data))
  }

  addUsers(data: Users[]): Observable<boolean> {
    return this.apollo.mutate({
      mutation: CREATE_USERS,
      variables: {input : data},
      fetchPolicy: 'no-cache'
    }).pipe(
      tap( () => this.coreService.openSnackBar('Users Added Successfully')),
      map(value => value.data),
      mapTo(true)
    );
  }
}
