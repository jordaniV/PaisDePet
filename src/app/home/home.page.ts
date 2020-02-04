import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { OverlayService } from '../core/services/overlay.service';
import { Button } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private route: Router,
    private authService: AuthService,
    private overlayService: OverlayService) {}


  logout() {
    this.overlayService.alert({
      header: 'Sair',
      message: 'Deseja sair da aplicação?',
      buttons: [
        {
          text: 'Não',
          role: 'nao',
          handler: () => {
            return;
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.authService.logout().then(() => this.route.navigate(['signin']));
          }
        }
      ]
    });
  }

}
