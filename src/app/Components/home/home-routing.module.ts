import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { CrudComponent } from './crud/crud.component';

const routes: Routes = [
  { path: '', redirectTo: 'crud', pathMatch: 'full' },
  { path: 'crud', component: CrudComponent },
  { path: 'about', component: AboutComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
