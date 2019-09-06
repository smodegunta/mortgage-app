import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from '@app/providers/quote.service';
import { EncompassUploadDialogModule } from '../encompass-upload-dialog/encompass-upload-dialog.module';
import { EncompassUploadDialogComponent } from '../encompass-upload-dialog/encompass-upload-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    EncompassUploadDialogModule,
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    QuoteService
  ],
  entryComponents: [EncompassUploadDialogComponent]
})
export class HomeModule { }
