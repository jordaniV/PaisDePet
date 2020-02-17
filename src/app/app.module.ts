import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { ModalNotificacaoPageModule } from './shared/pages/modal-notificacao/modal-notificacao.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    ModalNotificacaoPageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
