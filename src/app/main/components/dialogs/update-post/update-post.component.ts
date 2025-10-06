import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { PostType } from '../../../../models/post-type.enum';
import { POST_TYPE_LABELS, POST_TYPE_OPTIONS } from '../../../../models/post-type.labels';

@Component({
  selector: 'app-update-post',
  standalone: false,
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss'
})
export class UpdatePostComponent {
  form!: FormGroup
  imageError: string = '';
  selectedImage: File | null = null;
  POST_TYPE_OPTIONS = POST_TYPE_OPTIONS;
  POST_TYPE_LABELS = POST_TYPE_LABELS;
  isValidImage: boolean = false;
  constructor(public dialogRef: MatDialogRef<UpdatePostComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data.post.title, Validators.required],
      content: [this.data.post.content, Validators.required],
      imageUrl: this.data.post.imageUrl,
      videoUrl: this.data.post.videoUrl,
      postType: [PostType.Article],
      isPublished: true,
    })
  }

  enumValidator<T>(enm: any) {
    const values = new Set<number | string>(
      Object.values(enm).filter(v => typeof v === 'number') as (number | string)[]
    );
    return (control: AbstractControl): ValidationErrors | null =>
      values.has(control.value) ? null : { enum: true };
  }

  get formControls() {
    return this.form.controls;
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
    this.dialogRef.close();
  }

  onSubmit(): void {
    const token = localStorage.getItem("NHCToken");

    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('content', this.form.get('content')?.value);
    formData.append('videoUrl', this.form.get('videoUrl')?.value);
    formData.append('postType', this.form.get('postType')?.value);
    formData.append('isPublished', this.form.get('isPublished')?.value);

    if (this.selectedImage) {
      formData.append('imageFile', this.selectedImage, this.selectedImage.name);
    }

    this.service.UpdatePost(this.data.post.postId, formData, token).subscribe(res => {
      this.toastr.success("Updated Successfully", "Update Post")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Update Post")
    })
  }
}
