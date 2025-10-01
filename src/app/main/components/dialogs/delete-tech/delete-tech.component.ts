import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-tech',
  standalone: false,
  templateUrl: './delete-tech.component.html',
  styleUrl: './delete-tech.component.scss'
})
export class DeleteTechComponent {
 constructor(public dialogRef: MatDialogRef<DeleteTechComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: MainService, private toastr: ToastrService) { }

  DeleteTech() {
    const token = localStorage.getItem("token");

    this.service.DeleteTech(this.data.tech.technologyId, token).subscribe((res: any) => {
      this.dialogRef.close({ success: true });
      this.toastr.success(res.message, "Delete Technology");
    }, error => {
      this.dialogRef.close({ success: false });
      this.toastr.error(error.error.message, "Delete Technology");
    });
  }
}
