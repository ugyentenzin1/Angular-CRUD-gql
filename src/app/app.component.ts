import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_POSTS } from './graphql.operations';
import {map, Observable} from "rxjs";


interface Post {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'graphql';
  posts: Post[] = [];


  graphBinding : any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    // this.apollo.watchQuery<{ posts: Post[] }>({
    //   query: GET_POSTS
    // }).valueChanges.subscribe(res => {
    //   console.log(res)
    //   this.posts = res.data.posts;
    // })

    this.getData('').subscribe(res  => this.graphBinding = res.data);

  };


  getData(country: string): Observable<any> {
    return this.apollo.query<Post>({
      query: GET_POSTS,
      variables: {country},
      fetchPolicy: 'no-cache'
    }).pipe(map(res => res.data));
  }
}
