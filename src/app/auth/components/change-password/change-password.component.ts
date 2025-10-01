import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  form!: FormGroup

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [this.data.user.email],
      password: ['', Validators.required]
    })
    console.log(this.data.user.userId);
    console.log(this.form.get("email")?.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token = localStorage.getItem("token");
    this.service.ResetPassword(this.data.user.userId, { email: this.form.get("email")?.value, newPassword: this.form.get("password")?.value }, token).subscribe(res => {
      this.toastr.success("Created Successfully", "Create New User")
    }, err => {
      this.toastr.error(err.error.message, "Reset Password")
    })
  }
}
