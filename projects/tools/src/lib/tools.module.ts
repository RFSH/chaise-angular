import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { ErmrestService } from './ermrest.service';
import { WindowRefService } from './window-ref.service';
import { TableService } from './table.service';

@NgModule({
  declarations: [
    ErmrestService,
    WindowRefService,
    TableService
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    ErmrestService,
    WindowRefService,
    TableService
  ],
  providers: [
    WindowRefService
  ]
})
export class ToolsModule { }
