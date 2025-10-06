import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-service',
  standalone: false,
  templateUrl: './delete-service.component.html',
  styleUrl: './delete-service.component.scss'
})
export class DeleteServiceComponent {
  constructor(public dialogRef: MatDialogRef<DeleteServiceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: MainService, private toastr: ToastrService) { }

  DeleteService() {
    const token = localStorage.getItem("NHCToken");

    this.service.DeleteService(this.data.service.serviceId, token).subscribe((res: any) => {
      this.dialogRef.close({ success: true });
      this.toastr.success(res.message, "Delete Service");
    }, error => {
      this.dialogRef.close({ success: false });
      this.toastr.error(error.error.message, "Delete Service");
    });
  }
}
