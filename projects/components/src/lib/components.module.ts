import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


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
      TooltipModule.forRoot(),
      BsDropdownModule.forRoot()
  ],
  exports: [
    TableComponent
  ]
})
export class ComponentsModule { }
