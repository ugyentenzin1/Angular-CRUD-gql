import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loginCredt!: FormGroup
  hide: boolean = true;
  c_hide: boolean = true;

  constructor(private _auth: AuthService, private _fb: FormBuilder) {
    this.loginCredt = this._fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: [null, Validators.required],
      c_password: [null, Validators.required]
    },
      {
        validators: this.matchPassword('password', 'c_password')
      })
  }

  register(): void {
    if (this.loginCredt.valid) {
      this._auth.register(this.loginCredt.controls['email'].value, this.loginCredt.controls['password'].value);
    } else {
      alert('Please fix the errors in the form');
    }
    this.loginCredt.reset();
  }

  matchPassword(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const cPasswordControl = formGroup.controls[confirmPassword];

      //return if any error other tha matchpassword
      if (cPasswordControl.errors && !cPasswordControl.errors['mustMatch']) {
        return
      }
      //if value diff set error
      if (passwordControl.value !== cPasswordControl.value) {
        cPasswordControl.setErrors({ mustMatch: true })
      }
      //if value same then null error
      else {
        cPasswordControl.setErrors(null)
      }
    }
  }
}
