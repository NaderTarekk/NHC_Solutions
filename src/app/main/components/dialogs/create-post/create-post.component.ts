import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { PostType } from '../../../../models/post-type.enum';
import { POST_TYPE_LABELS, POST_TYPE_OPTIONS } from '../../../../models/post-type.labels';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  form!: FormGroup
  POST_TYPE_OPTIONS = POST_TYPE_OPTIONS;
  POST_TYPE_LABELS = POST_TYPE_LABELS;
  selectedImage: File | null = null;
  imageError: string = '';
  isValidImage: boolean = false;
  constructor(public dialogRef: MatDialogRef<CreatePostComponent>, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: '',
      videoUrl: '',
      postType: [PostType.Article],
      isPublished: true
    })
  }

  enumValidator<T>(enm: any) {
    const values = new Set<number | string>(
      Object.values(enm).filter(v => typeof v === 'number') as (number | string)[]
    );
    return (control: AbstractControl): ValidationErrors | null =>
      values.has(control.value) ? null : { enum: true };
  }

  get postTypeLabel(): string {
    return POST_TYPE_LABELS[this.form.value.postType as PostType];
  }

  onCancel(): void {
    this.form.reset();
    this.dialogRef.close();
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

  onSubmit(): void {
    const token: any = localStorage.getItem("NHCToken");

    const formData = new FormData();

    formData.append('title', this.form.get('title')?.value);
    formData.append('content', this.form.get('content')?.value);
    formData.append('videoUrl', this.form.get('videoUrl')?.value);
    formData.append('postType', this.form.get('postType')?.value);
    formData.append('isPublished', this.form.get('isPublished')?.value);

    if (this.selectedImage) {
      formData.append('imageFile', this.selectedImage, this.selectedImage.name);
    }

    this.service.CreatePost(formData, token).subscribe(res => {
      this.toastr.success("Created Successfully", "Create New Post")
      this.dialogRef.close({ success: true });
    }, err => {
      this.toastr.error(err.error.message, "Create New Post")
    })
  }

  get formControls() {
    return this.form.controls;
  }

  onPostTypeChange() {
    const val = this.form.get('postType')!.value as number;
  }
}
