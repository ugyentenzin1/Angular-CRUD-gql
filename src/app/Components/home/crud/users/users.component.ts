import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {map, Observable, switchMap} from "rxjs";
import {GET_USERS} from "../../../../graphql.operations";
import {MatDialog} from "@angular/material/dialog";
import {CreateUsersComponent} from "./create-users/create-users.component";
import {UserService} from "../../../../Services/user.service";
import {user} from "@angular/fire/auth";
import {EditUsersComponent} from "./edit-users/edit-users.component";

interface Users {
  gender: string,
  phone: number,
  username: string,
  email: string,
  website: string
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit{


  users!: any[];

  constructor(private apollo : Apollo,
              public dialog: MatDialog,
              private userService: UserService) {
  }

  displayedColumns: string[] = ['id', 'name', 'phone', 'username', 'email', 'website', 'actions'];


  ngOnInit() {
    this.userService.getUser().subscribe(val => this.users = val.users.data )
  }


  addUserSDialog() {
    this.dialog.open(CreateUsersComponent, {
      width: '600px',
    }).afterClosed().pipe(switchMap(() => this.userService.getUser()))
      .subscribe(val => this.users = val.users.data);
  }

  editUserDialog(id: any) {
    this.dialog.open(EditUsersComponent, {
      width: '600px',
      data: {
       id: id,
        value: this.users.find(val => val.id === id),
      }
    }).afterClosed().
      pipe(switchMap(()=> this.userService.getUserBysId(id))).
    subscribe()
  }

  removeUser(id: any) {
    this.userService.removeUser(id).pipe(
      switchMap(() => this.userService.getUser())
    ).subscribe(val => console.log(val, 'done'))
  }
}
