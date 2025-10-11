import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-update-project',
  standalone: false,
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.scss'
})
export class UpdateProjectComponent {
  form!: FormGroup
  token: any
  imageError: string | null = null;
  selectedImage: File | null = null;
  isValidImage: boolean = false;

  constructor(public dialogRef: MatDialogRef<UpdateProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: MainService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("NHCToken");

    this.form = this.fb.group({
      projectTitle: [this.data.project.projectTitle, Validators.required],
      description: [this.data.project.description, Validators.required],
      demoVideoUrl: [this.data.project.demoVideoUrl],
      projectImages: this.fb.array([]),
      postType: 1,
      isVisible: this.data.project.isVisible
    });

    this.setProjectImages(this.data.project.projectImages);
  }

  setProjectImages(images: any[]): void {
    images.forEach((image) => {
      this.projectImages.push(
        this.fb.group({
          imageUrl: [image.imageUrl],
          isMainImage: [image.isMainImage],
          imageFile: [null],
        })
      );
    });
  }

  get projectImages(): FormArray {
    return this.form.get('projectImages') as FormArray;
  }

  removeImage(index: number): void {
    this.service.DeletePrjectImage(this.data.project.projectId, this.data.project.projectImages[index].projectImageId, this.token).subscribe(res => {
      this.toastr.success("Deleted Successfuly", "Delete Project Image")
      this.projectImages.removeAt(index);
    }, error => {
      this.toastr.success(error.error.message, "Delete Project Image")
    })
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file instanceof File) {
        const imageGroup = this.fb.group({
          imageFile: [file, Validators.required],  // Store the selected file
          isMainImage: [false],  // Default isMainImage to false for new images
          imageUrl: [URL.createObjectURL(file)]  // Image preview URL
        });

        this.projectImages.push(imageGroup);

        this.addNewImage(file);
      } else {
        console.error("Selected file is not a valid File object.");
      }
    }
  }

  addNewImage(file: File): void {
    const formData = new FormData();

    this.form.value.projectImages.forEach((image: any, index: number) => {
      if (image.imageFile) {
        formData.append(`Images[${index}].ImageFile`, image.imageFile);  // Append the file (IFormFile)
        formData.append(`Images[${index}].IsMainImage`, image.isMainImage.toString());  // Append IsMainImage
      }
    });

    formData.append(`Images[${this.form.value.projectImages.length}].ImageFile`, file);
    formData.append(`Images[${this.form.value.projectImages.length}].IsMainImage`, 'false');  // Default to false for new image

    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`File key: ${key}, File name: ${value.name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    this.service.AddNewImageToProject(this.data.project.projectId, formData, this.token).subscribe(
      (res) => {
        this.toastr.success('Image added successfully!', 'Add Image');
      },
      (error) => {
        this.toastr.error(error.error.message, 'Add Image');
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();

      Object.keys(this.form.value).forEach((key) => {
        if (key !== 'projectImages') {
          formData.append(key, this.form.value[key]);
        }
      });



      this.service.UpdateProject(this.data.project.projectId, formData, this.token).subscribe(
        (res) => {
          this.toastr.success('Project updated successfully!', 'Update Project');
          this.dialogRef.close({ success: true });
        },
        (error) => {
          this.toastr.error(error.error.message, 'Update Project');
        }
      );
    }
  }


  get formControls() {
    return this.form.controls;
  }

  onCancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.projectImages.at(index).patchValue({ imageFile: file });
    }
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