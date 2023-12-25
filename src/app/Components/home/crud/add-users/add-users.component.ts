import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {BehaviorSubject, Observable, of} from "rxjs";
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


  constructor(private fb: FormBuilder) {

  }

  data: data[] = [{name:"Ugyen Tenzin", age: "20", email: "ugyen", phone: 'sadf', school: "asdf"}];

  displayedColumns = ['name', 'age', 'email', 'phone', 'school']

  form!: FormGroup
  newData?: MatTableDataSource<data>;
  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      school: ['', Validators.required],
    })
  }

  addUsers(): void {
    this.data.unshift(this.form?.value);
  }

  deleteUser(id: number): void {
    this.data.splice(id, 1);
    console.log(this.data);
  }
}
