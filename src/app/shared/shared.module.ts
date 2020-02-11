import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

// aqui ficam os modulos comuns para as diversas areas da aplicação

@NgModule({
  declarations: [
    MenuToggleComponent,
    LogoutButtonComponent
  ],
  imports: [ IonicModule ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MenuToggleComponent,
    LogoutButtonComponent
  ]
})
export class SharedModule {}
