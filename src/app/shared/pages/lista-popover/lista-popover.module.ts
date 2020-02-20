import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPopoverPageRoutingModule } from './lista-popover-routing.module';

import { ListaPopoverPage } from './lista-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPopoverPageRoutingModule
  ],
  declarations: [ListaPopoverPage]
})
export class ListaPopoverPageModule {}
