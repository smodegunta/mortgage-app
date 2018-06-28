import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncompassUploadModule } from '../encompass-upload/encompass-upload.module';
import { EncompassUploadDialogComponent } from './encompass-upload-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    EncompassUploadModule
  ],
  declarations: [EncompassUploadDialogComponent],
  exports: [EncompassUploadDialogComponent]
})
export class EncompassUploadDialogModule { }
