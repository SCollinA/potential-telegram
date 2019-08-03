import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePageComponent } from './table-page/table-page.component';
import { FormPageComponent } from './form-page/form-page.component';

const routes: Routes = [
  { path: 'modal-form', component: TablePageComponent },
  { path: 'page-form', component: FormPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
