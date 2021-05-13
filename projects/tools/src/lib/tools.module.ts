import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { WindowRefService } from './window-ref.service';
import { CallbackPipe } from './callback.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [
    CallbackPipe,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    CallbackPipe,
    SafeHtmlPipe
  ],
  providers: [
    WindowRefService
  ]
})
export class ToolsModule { }
