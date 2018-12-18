import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { FileUploadModule } from 'ng2-file-upload';
import { EncompassUploadComponent } from './encompass-upload.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FileUploadModule
  ],
  declarations: [EncompassUploadComponent],
  exports: [EncompassUploadComponent]
})
export class EncompassUploadModule { }
