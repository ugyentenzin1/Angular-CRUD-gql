import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home/crud', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, loadChildren: () => import('./Components/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent, loadChildren: () => import('./Components/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
