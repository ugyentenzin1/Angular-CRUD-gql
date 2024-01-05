import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../../Services/user.service";

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit{

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<any>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.value.name, Validators.required],
      phone: [this.data.value.phone, Validators.required],
      username: [this.data.value.username, Validators.required],
      website: [this.data.value.website, Validators.required],
      email: [this.data.value.email, Validators.required]
    })
    this.data.value && this.patchData();
  }

  patchData(): void {
    this.form.patchValue(this.data.value);
  }

  saveChanges(id: any, newValue: any) {
    this.dialogRef.close();
    this.userService.editUser(id, newValue).subscribe();
  }
}
