import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EncompassUploadComponent } from '../encompass-upload/encompass-upload.component';

@Component({
  selector: 'app-encompass-upload-dialog',
  templateUrl: './encompass-upload-dialog.component.html',
  styleUrls: ['./encompass-upload-dialog.component.scss']
})
export class EncompassUploadDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EncompassUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
