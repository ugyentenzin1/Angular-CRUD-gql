import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeRoutingModule } from './home-routing.module';
import { CrudComponent } from './crud/crud.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from './crud/add-user-dialog/add-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { DeleteUserDialogComponent } from './crud/delete-user-dialog/delete-user-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProfileComponent } from './profile/profile.component';
import { AddUsersComponent } from './crud/add-users/add-users.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { UsersComponent } from './crud/users/users.component';
import {MatRippleModule} from "@angular/material/core";
import { CreateUsersComponent } from './crud/users/create-users/create-users.component';
import { EditUsersComponent } from './crud/users/edit-users/edit-users.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    CrudComponent,
    AddUserDialogComponent,
    DeleteUserDialogComponent,
    ProfileComponent,
    AddUsersComponent,
    UsersComponent,
    CreateUsersComponent,
    EditUsersComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        RouterModule,
        HomeRoutingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        MatTableModule,
        FormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatRippleModule
    ]
})
export class HomeModule { }
