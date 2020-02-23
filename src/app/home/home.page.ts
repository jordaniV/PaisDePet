import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  nome: string;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    /* verifica se tem algum usuário logado, se tiver disponibiliza as informações do mesmo */
    this.authService.getInfoUsuario().subscribe(user => {
      user ? this.nome = user.displayName
        : this.nome = '';
    });
  }
}
