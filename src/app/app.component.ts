import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  usuario: firebase.User;
  nome = '';


  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Meus Pets',
      url: '/meus-pets',
      icon: 'paw'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    /* verifica o status da autenticação (se esta logado e quais as informações do usuario)
    precisa estar aqui no app pois se o usuário fechar o app sem fazer logout e entrar novamente o app vai se responsabilizar em puxar
    as informações do usuário que estão salvas*/
    this.authService.statusDaAutenticacao$.subscribe(user => (this.usuario = user));

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
