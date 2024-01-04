import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {CREATE_USERS} from "../../../../../graphql.operations";
import {map, switchMap, tap} from "rxjs";
import {UserService} from "../../../../../Services/user.service";
interface Users {
  gender: string,
  phone: number,
  username: string,
  email: string,
  website: string
}

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit{

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<any>,  private fb: FormBuilder,
              private apollo: Apollo, private userService: UserService) {
  }

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      website: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  addUsers(data: Users[]) {
    this.userService.addUsers(data).
    subscribe(() => this.dialogRef.close());
  }
}
