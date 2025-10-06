import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-about-post',
  standalone: false,
  templateUrl: './about-post.component.html',
  styleUrl: './about-post.component.scss'
})
export class AboutPostComponent {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AboutPostComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data.post.title, Validators.required],
      content: [this.data.post.content, Validators.required],
      imageUrl: [this.data.post.imageUrl],
      videoUrl: [this.data.post.videoUrl],
      postType: [this.data.post.postType, [Validators.required]],
      isPublished: [this.data.post.isPublished]
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
   sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getYouTubeEmbedUrl(url: string): string {
    // Match the YouTube URL and extract the video ID
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/([^"&?\/\s]*))|(?:youtu\.be\/([^"&?\/\s]*)))/;
    const match = url.match(regExp);

    // If a video ID is found, return the embed URL
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    // Return an empty string if not a valid YouTube URL
    return '';
  }

}
