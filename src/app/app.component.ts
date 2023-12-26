import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {CREATE_COMMENTS, GET_POSTS} from './graphql.operations';
import {map, Observable, tap} from "rxjs";


interface  users  {
  id: string,
  email: string,
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'graphql';


  graphBinding!: any[];

  comment:any[] = [];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    // this.apollo.watchQuery<{ posts: Post[] }>({
    //   query: GET_POSTS
    // }).valueChanges.subscribe(res => {
    //   console.log(res)
    //   this.posts = res.data.posts;
    // })

    // this.updateData('8db57b8f-be09-4e07-a1f6-4fb77d9b16e7', true).subscribe(
    //   res => console.log(res, 'test failed')
    // )

    console.log(this.comment);
  };


  getCommentById(id: string) {
    this.getData(id).subscribe(res=> {this.comment.push(res);
    console.log(this.comment, res, 'test')});

  }

  getData(id: string): Observable<any[]> {
    return this.apollo.query<any[]>({
      query: GET_POSTS,
      variables: {commentId: id},
      fetchPolicy: 'no-cache'
    }).pipe(map(res => res.data));
  }

  updateData(id: string, checked: boolean): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_COMMENTS,
      variables: {input : {id, checked}},
      fetchPolicy: 'no-cache'
    }).pipe(map(res => res.data))
  }
}
