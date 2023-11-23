import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { IUser, UserService } from 'src/app/Services/user.service';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  // dataSource: IUser[] = [];
  dataSource!: MatTableDataSource<IUser>;
  displayedColumns: string[] = ['name', 'gender', 'role', 'review', 'actions'];
  searchText!: string;
  filteredList?: IUser[];
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private _userService: UserService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this._userService.getUsers().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // Set the length for pagination
      this.searchTable();
    })
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { id },
      width: '20rem'
    });
    dialogRef.afterClosed().subscribe(val => val && this.getUserList());
  }

  openDialog(data?: IUser[]): void {
    this.dialog.open(AddUserDialogComponent, {
      data
    }).afterClosed().subscribe(val => val && this.getUserList());
  }

  searchTable(): void {
    this.filteredList = this.dataSource?.filteredData.filter((user:any) =>
      user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
