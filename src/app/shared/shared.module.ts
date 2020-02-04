import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// aqui ficam os modulos comuns para as diversas areas da aplicação

@NgModule({
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule {}
