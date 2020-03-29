import { NgModule } from '@angular/core';

import { MeusPetsPageRoutingModule } from './meus-pets-routing.module';
import { MeusPetsPage } from './meus-pets.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MeusPetsPageRoutingModule
  ],
  declarations: [MeusPetsPage]
})
export class MeusPetsPageModule {}
