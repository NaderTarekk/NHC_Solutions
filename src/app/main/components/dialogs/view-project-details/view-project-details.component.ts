import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';

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
      width: '1200px',
      maxHeight: '90vh'
    });
  }

  openVideoDialog(videoUrl:string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.height = 'auto';

    dialogConfig.data = {
      youtubeId: videoUrl,
    };

    this.dialog.open(VideoDialogComponent, dialogConfig);
  }
}
