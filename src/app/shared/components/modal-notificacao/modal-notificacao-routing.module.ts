import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNotificacaoPage } from './modal-notificacao.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNotificacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNotificacaoPageRoutingModule {}
