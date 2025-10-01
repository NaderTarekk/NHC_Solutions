import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  standalone: false,
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: AuthService, private toastr: ToastrService) { }

  DeleteUser() {
    const token = localStorage.getItem("token");
    this.service.DeleteUser(this.data.id, token).subscribe((res: any) => {
      this.dialogRef.close({ success: true });
      this.toastr.success(res.message, "Delete User");
    }, error => {
      this.dialogRef.close({ success: false });
      this.toastr.error(error.error);
    });
  }


}
