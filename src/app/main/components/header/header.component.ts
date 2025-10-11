import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VideoDialogComponent } from '../dialogs/video-dialog/video-dialog.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private dialog: MatDialog) { }

  openVideoDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = 'auto';

    // Pass video data
    dialogConfig.data = {
      youtubeId: 'https://www.youtube.com/embed/CvAOGzdO_F8?si=-Iq9K4wFyKiHxsyF',
    };

    this.dialog.open(VideoDialogComponent, dialogConfig);
  }
}
