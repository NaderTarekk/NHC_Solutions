import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-testimonial',
  standalone: false,
  templateUrl: './update-testimonial.component.html',
  styleUrl: './update-testimonial.component.scss'
})
export class UpdateTestimonialComponent {
  form!: FormGroup

  constructor(public dialogRef: MatDialogRef<UpdateTestimonialComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      clientName: [this.data.test.clientName, Validators.required],
      companyName: this.data.test.companyName,
      clientEmail: this.data.test.clientEmail,
      linkedInUrl: this.data.test.linkedInUrl,
      comment: [this.data.test.comment, Validators.required],
      isApproved: this.data.test.isApproved
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token = localStorage.getItem("NHCToken");

    this.service.UpdateTestimonial(this.data.test.testimonialId, this.form.value, token).subscribe(res => {
      this.toastr.success("Updated Successfully", "Update Testimonial")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Update Testimonial")
    })
  }
}
