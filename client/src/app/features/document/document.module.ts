import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { DocumentDetailsComponent } from './components/document-details/document-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateDocumentComponent,
    DocumentsListComponent,
    DocumentDetailsComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DocumentModule { }
