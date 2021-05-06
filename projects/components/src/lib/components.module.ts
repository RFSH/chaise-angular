import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from "./table/table.component";
import { TableHeaderComponent } from './table-header/table-header.component';

@NgModule({
  declarations: [
    TableComponent,
    TableHeaderComponent
  ],
  imports: [
      BrowserModule
  ],
  exports: [
    TableComponent,
    TableHeaderComponent
  ]
})
export class ComponentsModule { }
