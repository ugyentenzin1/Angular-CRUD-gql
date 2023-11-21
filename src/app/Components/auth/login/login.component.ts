import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginCredt!: FormGroup;
  hide: boolean = true;
  emailErrorMessages = {
    required: 'Email is required',
    invalid: 'Invalid email format',
  };

  constructor(private _auth: AuthService, private router: Router, private _fb: FormBuilder) {
    console.log(this._auth.isLoggedIn());
    this.loginCredt = this._fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: [null, Validators.required]
    })

  }

  ngOnInit(): void {
    if (this._auth.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  login(): void {
    this._auth.login(this.loginCredt.controls['email'].value, this.loginCredt.controls['password'].value);
    this.loginCredt.reset();
  }

  forgot(): void {
    this._auth.forgotPassword(this.loginCredt.controls['email'].value);
  }

}
