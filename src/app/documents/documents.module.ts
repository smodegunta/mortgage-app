import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from '@app/documents/documents.component';
import { MaterialModule } from '@app/material.module';
import { DocumentsRoutingModule } from '@app/documents/documents-routing.module';
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
