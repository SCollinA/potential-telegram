import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { TablePageComponent } from './table-page/table-page.component';
import { AppRoutingModule } from './app-routing.module';
import { FormPageComponent } from './form-page/form-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    FormComponent,
    TableComponent,
    TablePageComponent,
    FormPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
