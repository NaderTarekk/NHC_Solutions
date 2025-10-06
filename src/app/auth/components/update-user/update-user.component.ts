import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  form!: FormGroup

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [this.data.user.username, Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      isActive: this.data.user.isActive
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token = localStorage.getItem("NHCToken");
    this.service.UpdateUser(this.data.user.userId, this.form.value, token).subscribe(res => {
      this.toastr.success("Updated Successfully", "Update User")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Update User")
    })
  }
}
