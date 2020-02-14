import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-notificacao',
  templateUrl: './modal-notificacao.page.html',
  styleUrls: ['./modal-notificacao.page.scss']
})
export class ModalNotificacaoPage implements OnInit {
  txtPrincipal: string;
  txtBotao: string;
  icone: string;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.txtPrincipal;
    this.txtBotao;
    this.icone;
  }

  retornarTelaLogin() {
    this.navCtrl.navigateRoot('/signin');
    this.modalCtrl.dismiss();
  }
}
