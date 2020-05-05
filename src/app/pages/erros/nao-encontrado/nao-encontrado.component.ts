import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlataformaService } from 'src/app/shared/services/plataforma.service';

@Component({
  selector: 'app-nao-encontrado',
  templateUrl: './nao-encontrado.component.html',
  styleUrls: ['./nao-encontrado.component.scss'],
})
export class NaoEncontradoComponent implements OnInit {

  ehBrowser;
  constructor(
    private navCtrl: NavController,
    private plataformaService: PlataformaService) { }

  ngOnInit() {
    this.ehBrowser = this.plataformaService.ehBrowser();
  }

  retornaParaTelaDeLogin() {
    this.navCtrl.navigateRoot('/home');
  }

}
