import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-project',
  standalone: false,
  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.scss'
})
export class DeleteProjectComponent {
 constructor(public dialogRef: MatDialogRef<DeleteProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: MainService, private toastr: ToastrService) { }

  DeletePrject() {
    const token = localStorage.getItem("NHCToken");

    this.service.DeleteProject(this.data.project.projectId, token).subscribe((res: any) => {
      this.dialogRef.close({ success: true });
      this.toastr.success(res.message, "Delete Project");
    }, error => {
      this.dialogRef.close({ success: false });
      this.toastr.error(error.error.message, "Delete Project");
    });
  }
}
