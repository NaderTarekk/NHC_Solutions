import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-service',
  standalone: false,
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.scss'
})
export class UpdateServiceComponent {
  form!: FormGroup

  constructor(public dialogRef: MatDialogRef<UpdateServiceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      serviceTitle: [this.data.service.serviceTitle, Validators.required],
      description: [this.data.service.description, Validators.required],
      icon: this.data.service.icon
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token = localStorage.getItem("token");
    this.service.UpdateService(this.data.service.serviceId, this.form.value, token).subscribe(res => {
      this.toastr.success("Updated Successfully", "Update Service")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Update Service")
    })
  }
}
