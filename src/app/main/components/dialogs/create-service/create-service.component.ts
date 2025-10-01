import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../../services/main.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-create-service',
  standalone: false,
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss'
})
export class CreateServiceComponent {
  form!: FormGroup

  constructor(public dialogRef: MatDialogRef<CreateServiceComponent>, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      serviceTitle: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['', Validators.required],
      createdBy: [0],
    })
  }

  onCancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token: any = localStorage.getItem("token");
    const decoded: any = jwtDecode(token);
    this.form.patchValue({
      createdBy: decoded.Id
    })

    this.service.CreateService(this.form.value, token).subscribe(res => {
      this.toastr.success("Created Successfully", "Create New Service")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Create New Service")
    })
  }

  get formControls() {
    return this.form.controls;
  }
}

