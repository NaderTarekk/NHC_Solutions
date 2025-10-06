import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-post',
  standalone: false,
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.scss'
})
export class DeletePostComponent {
  constructor(public dialogRef: MatDialogRef<DeletePostComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: MainService, private toastr: ToastrService) { }

  DeletePost() {
    const token = localStorage.getItem("NHCToken");

    this.service.DeletePost(this.data.post.postId, token).subscribe((res: any) => {
      this.dialogRef.close({ success: true });
      this.toastr.success(res.message, "Delete Post");
    }, error => {
      this.dialogRef.close({ success: false });
      this.toastr.error(error.error.message, "Delete Post");
    });
  }
}
