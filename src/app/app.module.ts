import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { TablePageComponent } from './table-page/table-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    FormComponent,
    TableComponent,
    TablePageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
