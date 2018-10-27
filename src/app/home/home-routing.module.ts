import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { DocumentsListComponent } from '../documents-list/documents-list.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: 'loans', pathMatch: 'full' },
    { path: 'loans', component: DocumentsListComponent, data: { title: extract('Loans') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
