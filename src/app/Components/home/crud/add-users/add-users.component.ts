import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import { Apollo } from 'apollo-angular';
import {CREATE_COMMENTS} from "../../../../graphql.operations";

interface data {
  name: string,
  age: string,
  email: string,
  phone: string,
  school: string
}

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit{


  constructor(private fb: FormBuilder, private apollo: Apollo) {

  }

  data: data[] = [{name:"Ugyen Tenzin", age: "20", email: "ugyen", phone: 'sadf', school: "asdf"}];

  displayedColumns = ['name', 'age', 'email', 'phone', 'school']

  form!: FormGroup;

  formGraph!: FormGroup;
  newData?: MatTableDataSource<data>;


  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      school: ['', Validators.required],
    })

    this.formGraph = this.fb.group({
      name: '',
      email: '',
      body: ''
    })
  }

  addUsers(): void {
    this.data.unshift(this.form?.value);
  }

  deleteUser(id: number): void {
    this.data.splice(id, 1);
    console.log(this.data);
  }

  updateComment(): any {
    this.updateCommentApi(this.formGraph.value).subscribe(
      value => console.log(value)
    )
  }


  updateCommentApi(attributes: any): Observable<any> {
   return this.apollo.mutate({
     mutation: CREATE_COMMENTS,
     variables: {input: attributes},
     fetchPolicy: 'no-cache'
   }).pipe(map(val => val.data));
  }
}
