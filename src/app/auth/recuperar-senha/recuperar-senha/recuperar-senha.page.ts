import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss']
})
export class RecuperarSenhaPage implements OnInit {

  emailForm: FormGroup;

  constructor(
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.menuCtrl.enable(false); // ao rodar a aplicação não vai aparecer o menu
    this.emailForm.reset();
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true); // quando o ciclo de vida da pagina acabar( sair da pagina de login) ele libera o menu novamente
  }
}
