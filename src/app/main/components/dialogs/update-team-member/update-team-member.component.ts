import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-team-member',
  standalone: false,
  templateUrl: './update-team-member.component.html',
  styleUrl: './update-team-member.component.scss'
})
export class UpdateTeamMemberComponent {
  form!: FormGroup
  selectedImage: File | null = null;
  imageError: string = '';
  isValidImage: boolean = false;

  constructor(public dialogRef: MatDialogRef<UpdateTeamMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [this.data.member.firstName, Validators.required],
      lastName: [this.data.member.lastName, Validators.required],
      jobTitle: [this.data.member.jobTitle, Validators.required],
      photoUrl: this.data.member.photoUrl
    })
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(fileExtension || '')) {
        this.imageError = 'Only JPG, JPEG, PNG, or WebP files are allowed.';
        this.selectedImage = null;
        this.isValidImage = true;
        return;
      }

      const maxSizeInMB = 2;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        this.imageError = `Image size must not exceed ${maxSizeInMB} MB.`;
        this.selectedImage = null;
        this.isValidImage = true;
        return;
      }

      this.imageError = '';
      this.selectedImage = file;
      this.isValidImage = false;
    }
  }

  onCancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token: any = localStorage.getItem("NHCToken");

    const formData = new FormData();

    formData.append('firstName', this.form.get('firstName')?.value);
    formData.append('lastName', this.form.get('lastName')?.value);
    formData.append('jobTitle', this.form.get('jobTitle')?.value);

    if (this.selectedImage) {
      formData.append('photoFile', this.selectedImage, this.selectedImage.name);
    }

    this.service.UpdateTeamMember(this.data.member.teamMemberId, formData, token).subscribe(res => {
      this.toastr.success("Created Successfully", "Add New Team Member")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Add New Team Member")
    })
  }

  get formControls() {
    return this.form.controls;
  }
}
