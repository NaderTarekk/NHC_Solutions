import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-delete-team-member',
  standalone: false,
  templateUrl: './delete-team-member.component.html',
  styleUrl: './delete-team-member.component.scss'
})
export class DeleteTeamMemberComponent {
  constructor(public dialogRef: MatDialogRef<DeleteTeamMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: MainService, private toastr: ToastrService) { }

  DeleteMember() {
    const token = localStorage.getItem("NHCToken");

    this.service.DeleteTeamMember(this.data.member.teamMemberId, token).subscribe((res: any) => {
      this.dialogRef.close({ success: true });
      this.toastr.success(res.message, "Delete Team Member");
    }, error => {
      this.dialogRef.close({ success: false });
      this.toastr.error(error.error.message, "Delete Team Member");
    });
  }
}
