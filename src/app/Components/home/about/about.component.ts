import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  searchText?: string;
  results?: any[] = []; //can be undefined -> same as results: any[] | undefined
  errorMessage: string = '';
  url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  constructor(private _http: HttpClient) { }

  onSubmit() {
    return this._http.get<any[]>(this.url + this.searchText).pipe(catchError(err => {
      return of(err.error.message as string);
    })).subscribe((data) => {
      this.searchText = '';
      if (typeof data === 'string') {
        this.errorMessage = data;
        this.results = undefined;
      }
      else this.results = data;
    });

    // return this._http.get<any[]>(this.url + this.searchText).pipe(catchError(err => {
    //   this.errorMessage = err.error.message;
    //   this.results = undefined;
    //   return of(null);
    // })).subscribe((data) => {
    //   this.searchText = '';
    //   if (data) this.results = data;
    // })
  }
}
