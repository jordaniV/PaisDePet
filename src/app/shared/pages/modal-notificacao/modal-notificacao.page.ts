import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-notificacao',
  templateUrl: './modal-notificacao.page.html',
  styleUrls: ['./modal-notificacao.page.scss']
})
export class ModalNotificacaoPage implements OnInit {

  txtPrincipal: string;
  txtBotao: string;
  icone: string;
  rota: string;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.txtPrincipal;
    this.txtBotao;
    this.icone;
    this.rota;
  }

  retornarParaTelaDeLogin() {
    this.navCtrl.navigateRoot(this.rota);
    this.modalCtrl.dismiss();
  }
}
