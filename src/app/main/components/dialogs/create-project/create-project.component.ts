import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-project',
  standalone: false,
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
form!: FormGroup

  constructor(public dialogRef: MatDialogRef<CreateProjectComponent>, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      img: ['', Validators.required],
    })
  }

  onCancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token: any = localStorage.getItem("NHCToken");

    this.service.CreateProject(this.form.value, token).subscribe(res => {
      this.toastr.success("Created Successfully", "Create New Project")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Create New Project")
    })
  }

  get formControls() {
    return this.form.controls;
  }
}
