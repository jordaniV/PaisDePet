import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { CameraButtonComponent } from './components/camera-button/camera-button.component';
import { ProfileButtonComponent } from './components/profile-button/profile-button.component';

/* aqui ficam os modulos, components e etc comuns para as diversas areas da aplicação */

@NgModule({
  declarations: [
    MenuToggleComponent,
    LogoutButtonComponent,
    CameraButtonComponent,
    ProfileButtonComponent
  ],
  imports: [
    IonicModule,
    CommonModule],
  exports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    MenuToggleComponent,
    LogoutButtonComponent,
    CameraButtonComponent,
    ProfileButtonComponent
  ]
})
export class SharedModule {}
