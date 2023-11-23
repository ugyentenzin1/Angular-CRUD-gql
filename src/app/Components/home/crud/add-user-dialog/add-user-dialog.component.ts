import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/Services/core.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  addUserForm!: FormGroup;
  constructor(
    private _userService: UserService,
    private _coreService: CoreService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formDetails()
  }

  ngOnInit(): void {
    this.addUserForm.patchValue(this.data)
  }

  closeDialog() {
    this.dialogRef.close();
  }

  formDetails(): void {
    this.addUserForm = this._fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      gender: [null, Validators.required],
      role: [null, Validators.required],
      review: [null, Validators.required],
    })
  }

  // submitForm(): void {
  //   if (this.addUserForm.valid) {
  //     if (this.data) {
  //       this._userService.updateUser(this.data.id, this.addUserForm.value).subscribe({
  //         next: () => {
  //           this._coreService.openSnackBar('Employee detail updated', 'Done')
  //           this.dialogRef.close(true);
  //         },
  //         error: (err) => {
  //           console.log(err)
  //         }
  //       });
  //     }
  //     else {
  //       this._userService.addUser(this.addUserForm.value).subscribe({
  //         next: () => {
  //           this._coreService.openSnackBar('Employee added successfully')
  //           this.dialogRef.close(true);
  //         },
  //         error: (err) => {
  //           console.log(err)
  //         }
  //       });
  //     }
  //   }
  // }

  submitForm() {
    if (this.addUserForm.valid) {
      if (this.data) {
        return this._userService.updateUser(this.data.id, this.addUserForm.value).subscribe(() => {
          this._coreService.openSnackBar('User updated successfully', 'Done');
          this.dialogRef.close(true);
        })
      }
      else {
        return this._userService.addUser(this.addUserForm.value).subscribe(() => {
          this._coreService.openSnackBar('User added successfully', 'Done');
          this.dialogRef.close(true);
        })
      }
    }
    return null;
  }
}
