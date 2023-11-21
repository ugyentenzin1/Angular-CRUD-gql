import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/Services/core.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent {

  constructor(
    private _coreService: CoreService,
    private _userService: UserService,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  confirmDelete() {
    this._userService.deleteUser(this.data.id).subscribe(() => {
      this._coreService.openSnackBar('User deleted successfully', 'Done');
      this.dialogRef.close(true);
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
