import { NgModule } from '@angular/core';
import { WikiComponent } from './wiki/wiki.component';
import { HelpComponent } from './help/help.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'wiki', component: WikiComponent },
  { path: 'help', component: HelpComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
