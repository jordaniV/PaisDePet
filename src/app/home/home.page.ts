import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { OverlayService } from '../core/services/overlay.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  nome: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private route: Router,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.authService.getInfoUsuario().subscribe(user => {
      this.nome = user.displayName;
    });
  }

  /*
  logout do sistema
  */
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
