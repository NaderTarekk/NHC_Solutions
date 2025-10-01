import { Component, inject, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {
  form!: FormGroup

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>, private fb: FormBuilder, private service: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.service.CreateUser(this.form.value).subscribe(res => {
      this.toastr.success("Created Successfully", "Create New User")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error, "Create New User")
    })

  }
}
