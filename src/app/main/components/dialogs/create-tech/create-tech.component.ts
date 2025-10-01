import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-tech',
  standalone: false,
  templateUrl: './create-tech.component.html',
  styleUrl: './create-tech.component.scss'
})
export class CreateTechComponent {
  form!: FormGroup

  constructor(public dialogRef: MatDialogRef<CreateTechComponent>, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      technologyName: ['', Validators.required],
      icon: ['', Validators.required],
      iconColor: ['', Validators.required],
    })
  }

  onCancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token: any = localStorage.getItem("token");

    this.service.CreateTech(this.form.value, token).subscribe(res => {
      this.toastr.success("Created Successfully", "Create New Technology")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Create New Technology")
    })
  }

  get formControls() {
    return this.form.controls;
  }
}
