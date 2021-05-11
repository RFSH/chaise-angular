import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from "./table/table.component";
import { TableHeaderComponent } from './table-header/table-header.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    TableComponent,
    TableHeaderComponent
  ],
  imports: [
      BrowserModule,
      TooltipModule.forRoot()
  ],
  exports: [
    TableComponent,
    TableHeaderComponent
  ]
})
export class ComponentsModule { }
