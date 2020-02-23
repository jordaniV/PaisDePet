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
    this.authService.getInfoUsuario().subscribe(user => {
      user ? this.nome = user.displayName
        : this.nome = '';
    });
  }
}
