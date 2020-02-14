import { NgModule } from '@angular/core';

import { ModalNotificacaoPageRoutingModule } from './modal-notificacao-routing.module';
import { ModalNotificacaoPage } from './modal-notificacao.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [ModalNotificacaoPage],
  imports: [
    SharedModule,
    ModalNotificacaoPageRoutingModule
  ],
  exports: [ModalNotificacaoPage]
})
export class ModalNotificacaoPageModule {}
