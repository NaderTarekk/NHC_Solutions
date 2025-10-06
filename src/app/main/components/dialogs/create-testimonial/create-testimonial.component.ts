import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-create-testimonial',
  standalone: false,
  templateUrl: './create-testimonial.component.html',
  styleUrl: './create-testimonial.component.scss'
})
export class CreateTestimonialComponent {
  form!: FormGroup

  constructor(public dialogRef: MatDialogRef<CreateTestimonialComponent>, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      clientName: ['', Validators.required],
      comment: ['', Validators.required],
      companyName: null,
      clientEmail: null,
      linkedInUrl: null
    })
  }

  onCancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token: any = localStorage.getItem("NHCToken");
    
    this.service.CreateTestimonial(this.form.value, token).subscribe(res => {
      this.toastr.success("Created Successfully", "Create New Testimonial")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Create New Testimonial")
    })
  }

  get formControls() {
    return this.form.controls;
  }
}
