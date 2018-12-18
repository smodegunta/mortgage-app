import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsListComponent } from '@app/documents-list/documents-list.component';
import { MaterialModule } from '@app/material.module';
import { DocumentsListRoutingModule } from '@app/documents-list/documents-list-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    DocumentsListRoutingModule
  ],
  declarations: [DocumentsListComponent],
  exports: [DocumentsListComponent],
})
export class DocumentsListModule { }
