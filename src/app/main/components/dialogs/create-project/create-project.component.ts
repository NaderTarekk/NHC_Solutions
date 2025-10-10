import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  token: any
  imageError: string | null = null;
  selectedImage: File | null = null;
  isValidImage: boolean = false;

  constructor(public dialogRef: MatDialogRef<CreateProjectComponent>, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("NHCToken");

    this.form = this.fb.group({
      projectTitle: ['', Validators.required],
      description: ['', Validators.required],
      demoVidUrl: [''],
      projectImages: this.fb.array([])
    });
  }

  get projectImages(): FormArray {
    return this.form.get('projectImages') as FormArray;
  }

  onFileSelected(event: any) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const imageGroup = this.fb.group({
        imageFile: [files[i], Validators.required],
        isMainImage: [false],
      });

      this.projectImages.push(imageGroup);
    }
  }

  removeImage(index: number): void {
    this.projectImages.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();

      Object.keys(this.form.value).forEach(key => {
        if (key !== 'projectImages') {
          formData.append(key, this.form.value[key]);
        }
      });

      this.form.value.projectImages.forEach((image: any, index: number) => {
        formData.append('projectImages[' + index + '].isMainImage', image.isMainImage);
        formData.append('projectImages[' + index + '].imageFile', image.imageFile);
      });


      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`File key: ${key}, File name: ${value.name}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      this.service.CreateProject(formData, this.token).subscribe((res: any) => {
        this.toastr.success("Created Successfully", "Create New Project")
        this.dialogRef.close({ success: true });
      }, error => {
        this.toastr.error(error.error.message, "Create New Project");
      })
    }
  }

  get formControls() {
    return this.form.controls;
  }

  onCancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  onMainImageChange(event: any, index: number) {
    this.projectImages.controls.forEach((control) => {
      control.patchValue({ isMainImage: false });
    });

    if (event.checked) {
      this.projectImages.at(index).patchValue({ isMainImage: true });
    } else {
      this.projectImages.at(index).patchValue({ isMainImage: false });
    }
  }

}
