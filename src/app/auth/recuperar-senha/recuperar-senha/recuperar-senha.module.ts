import { NgModule } from '@angular/core';

import { RecuperarSenhaPageRoutingModule } from './recuperar-senha-routing.module';
import { RecuperarSenhaPage } from './recuperar-senha.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RecuperarSenhaPageRoutingModule
  ],
  declarations: [RecuperarSenhaPage]
})
export class RecuperarSenhaPageModule {}
