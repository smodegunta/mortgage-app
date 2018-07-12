import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Route } from '@app/core';

const routes: Routes = [
  Route.withShell([
    // { path: 'about', loadChildren: 'app/about/about.module#AboutModule' }
    { path: 'loans/:loanId', loadChildren: 'app/documents/documents.module#DocumentsModule' },
    { path: 'loans', loadChildren: 'app/documents-list/documents-list.module#DocumentsListModule' }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
