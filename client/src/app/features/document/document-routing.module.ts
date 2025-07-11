import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { DocumentDetailsComponent } from './components/document-details/document-details.component';

const routes: Routes = [
  { path: 'create', component: CreateDocumentComponent },
  { path: 'list', component: DocumentsListComponent },
  { path: ':id', component: DocumentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentRoutingModule {}
