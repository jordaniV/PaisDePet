import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'pdp-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent implements OnInit {
  
  constructor(
    private overlayService: OverlayService
  ) {}

  ngOnInit() {}

  /* cria rota para a tela de profile */
  abrirTelaProfile() {
    this.overlayService.alert({ message: 'Abrir pagina de usuário do sistema' });
  }
}
