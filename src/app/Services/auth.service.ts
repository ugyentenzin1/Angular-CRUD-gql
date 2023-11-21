import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private _corseService: CoreService) { }

  //login method
  login(email: string, password: string): void {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      // localStorage.setItem('token', JSON.stringify({bearerToken: 'sdgsegesgse', user: {name: ''}}));
      this.router.navigate(['/home'])
      this._corseService.openSnackBar('Login Successful', 'Done')
    }).catch(err => {
      this._corseService.openSnackBar(err.message, 'Done')
      this.router.navigate(['/auth'])
    })
  }

  //register mthid 
  register(email: string, password: string): void {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      this._corseService.openSnackBar('Registration Successful', 'Done')
      this.router.navigate(['/auth']);
    })  .catch((err) => {
      this._corseService.openSnackBar(err.message, 'Done')
      this.router.navigate(['/register'])
    })
  }

  //signout 
  signout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/auth']);
      this._corseService.openSnackBar('Logout Successful', 'Done')
    }, err => {
      this._corseService.openSnackBar(err.message, 'Done')
    })
  }

  isLoggedIn() {
    return localStorage.getItem('token');
    // SAME AS ABOVE return localStorage.getItem('token') !== null;
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(
      email,
      { url: 'https://localhost:4200/auth' }
    ).then(() => {
      alert('Email sent')
    }, err => alert(err.message))
  }
}
