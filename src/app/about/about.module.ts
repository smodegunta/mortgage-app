import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { EncompassUploadModule } from '../encompass-upload/encompass-upload.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    AboutRoutingModule,
    EncompassUploadModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
