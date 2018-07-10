import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
import { MaterialModule } from '@app/material.module';
import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    DocumentsRoutingModule
  ],
  declarations: [DocumentsComponent],
  exports: [DocumentsComponent],
})
export class DocumentsModule { }
