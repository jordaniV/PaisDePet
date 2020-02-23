import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { ListaPopoverPage } from '../../pages/lista-popover/lista-popover.page';

@Component({
  selector: 'pdp-camera-button',
  templateUrl: './camera-button.component.html',
  styleUrls: ['./camera-button.component.scss']
})
export class CameraButtonComponent implements OnInit {
  constructor(private overlayService: OverlayService) {}

  ngOnInit() {}

  /*
  escolher se a foto virá direto da câmera, tirado foto na hora, ou se
  selecionará a foto da galeria
  */
  async selecionaDiretorioFoto(ev: Event) {
    await this.overlayService.popover({
      component: ListaPopoverPage,
      event: ev
    });
  }
}
