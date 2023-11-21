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

  submitForm() {
    return this._userService.addUser(this.addUserForm.value).subscribe(() => {
      this._coreService.openSnackBar('User added successfully', 'Done');
      this.dialogRef.close(true);
    })
  }
}
