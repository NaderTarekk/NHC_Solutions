import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-project-details',
  standalone: false,
  templateUrl: './view-project-details.component.html',
  styleUrl: './view-project-details.component.scss'
})
export class ViewProjectDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log(data.description);
    
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
