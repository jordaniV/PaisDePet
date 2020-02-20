import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPopoverPage } from './lista-popover.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPopoverPageRoutingModule {}
