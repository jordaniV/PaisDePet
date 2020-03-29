import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavController, MenuController } from '@ionic/angular';
import { OverlayService } from 'src/app/shared/services/overlay.service';

@Component({
  selector: 'pdp-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  @Input() menuId: string; // serve para pegar o id do menu toggle

  constructor(
    private authService: AuthService,
    private overlayService: OverlayService,
    private menuCtrl: MenuController,
    private navCtrl: NavController
  ) {}

  async ngOnInit(): Promise<void> {
    /* verifica se o menu toggle com o id especifico (caso tenha mais de um menu)
    esta desabilitado, se sim, habilita o mesmo*/
    if (!await this.menuCtrl.isEnabled(this.menuId)) {
      this.menuCtrl.enable(true, this.menuId);
    }
  }

  /*
  logout do sistema
  */
  async logout() {
    await this.overlayService.alert({
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
          handler: async () => {
            await this.authService.logout();
            await this.menuCtrl.enable(false, this.menuId);
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });
  }
}
