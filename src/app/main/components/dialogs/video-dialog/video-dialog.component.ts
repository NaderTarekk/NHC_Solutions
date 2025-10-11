import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-dialog',
  standalone: false,
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.scss'
})
export class VideoDialogComponent {
  safeUrl: any;

  constructor(
    private dialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    if (data.youtubeId) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/CvAOGzdO_F8?si=-Iq9K4wFyKiHxsyF`
      );
    }
    else if (data.videoUrl) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.videoUrl);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
