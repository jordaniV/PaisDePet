import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusPetsPage } from './meus-pets.page';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MeusPetsPage,
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusPetsPageRoutingModule {}
