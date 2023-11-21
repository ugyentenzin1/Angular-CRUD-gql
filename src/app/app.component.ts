import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_POSTS } from './graphql.operations';

interface Post {
  id: number;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'graphql';
  posts: Post[] = [];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    // this.apollo.watchQuery<{ posts: Post[] }>({
    //   query: GET_POSTS
    // }).valueChanges.subscribe(res => {
    //   console.log(res)
    //   this.posts = res.data.posts;
    // })
  };
}
