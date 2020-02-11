import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private authService: AuthService,
    private route: Router,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.authService.getInfoUsuario().subscribe(user => {
      this.nome = user.displayName;
    });
  }
}
