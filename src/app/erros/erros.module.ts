import { NgModule } from '@angular/core';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NaoEncontradoComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: NaoEncontradoComponent
      }
    ])
  ]
})
export class ErrosModule {}
