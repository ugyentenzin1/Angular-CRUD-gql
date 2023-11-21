import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _auth: AuthService) {
    // console.log(this._auth.isLoggedIn());
  }

  logout(): void {
    this._auth.signout()
  }
}
