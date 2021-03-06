import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TableComponent } from "./table/table.component";
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableContentComponent } from './table-content/table-content.component';

@NgModule({
  declarations: [
    TableComponent,
    TableHeaderComponent,
    TableContentComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      NgbModule
  ],
  exports: [
    TableComponent
  ]
})
export class ComponentsModule { }
