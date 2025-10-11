import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-view-project-details',
  standalone: false,
  templateUrl: './view-project-details.component.html',
  styleUrl: './view-project-details.component.scss'
})
export class ViewProjectDetailsComponent {
  readonly dialog = inject(MatDialog);
  
  constructor(
    public dialogRef: MatDialogRef<ViewProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.description);

  }

  onClose(): void {
    this.dialogRef.close();
  }

  openImageDialog(imgUrl: string) {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: imgUrl },
      width: '520px',
      maxHeight: '90vh'
    });
  }
}
