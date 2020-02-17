import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NaoEncontradoComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NaoEncontradoComponent
      }
    ])
  ]
})
export class ErrosModule {}
