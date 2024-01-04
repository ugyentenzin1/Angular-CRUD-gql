import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { CrudComponent } from './crud/crud.component';
import { ProfileComponent } from './profile/profile.component';
import {AddUsersComponent} from "./crud/add-users/add-users.component";
import {UsersComponent} from "./crud/users/users.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CrudComponent },
  { path: 'dict', component: AboutComponent },
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'add-users', component: AddUsersComponent},
  {path: 'users', component: UsersComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
