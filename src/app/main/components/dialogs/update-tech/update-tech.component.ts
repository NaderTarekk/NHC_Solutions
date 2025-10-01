import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-tech',
  standalone: false,
  templateUrl: './update-tech.component.html',
  styleUrl: './update-tech.component.scss'
})
export class UpdateTechComponent {
  form!: FormGroup

  constructor(public dialogRef: MatDialogRef<UpdateTechComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      technologyName: [this.data.tech.technologyName, Validators.required],
      icon: [this.data.tech.icon, Validators.required],
      iconColor: this.data.tech.iconColor
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token = localStorage.getItem("token");

    this.service.UpdateTech(this.data.tech.technologyId, this.form.value, token).subscribe(res => {
      this.toastr.success("Updated Successfully", "Update Technology")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Update Technology")
    })
  }
}
