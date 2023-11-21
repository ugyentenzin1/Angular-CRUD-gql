import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { IUser, UserService } from 'src/app/Services/user.service';
import { CoreService } from 'src/app/Services/core.service';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  dataSource: IUser[] = [];
  displayedColumns: string[] = ['name', 'gender', 'role', 'review', 'actions'];

  constructor(public dialog: MatDialog, private _userService: UserService, private _coreService: CoreService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this._userService.getUsers().subscribe((data) => {
      this.dataSource = data;
    })
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { id: id },
      width: '20rem'
    });
    dialogRef.afterClosed().subscribe(val => val && this.getUserList());
  }

  updateUser(data: IUser[]) {
    this.dialog.open(AddUserDialogComponent, {
      data: data
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe(val => val && this.getUserList());
  }

}
