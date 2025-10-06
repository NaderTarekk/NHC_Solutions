import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-testimonial',
  standalone: false,
  templateUrl: './delete-testimonial.component.html',
  styleUrl: './delete-testimonial.component.scss'
})
export class DeleteTestimonialComponent {
  constructor(public dialogRef: MatDialogRef<DeleteTestimonialComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: MainService, private toastr: ToastrService) { }

  DeleteTestimonial() {
    const token = localStorage.getItem("NHCToken");

    this.service.DeleteTestimonial(this.data.test.testimonialId, token).subscribe((res: any) => {
      this.dialogRef.close({ success: true });
      this.toastr.success(res.message, "Delete Testimonial");
    }, error => {
      this.dialogRef.close({ success: false });
      this.toastr.error(error.error.message, "Delete Testimonial");
    });
  }
}
