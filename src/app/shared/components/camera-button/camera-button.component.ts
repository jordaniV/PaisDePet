import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { PlataformaService } from '../../services/plataforma.service';
import { CameraService } from '../../services/camera.service';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';

@Component({
  selector: 'pdp-camera-button',
  templateUrl: './camera-button.component.html',
  styleUrls: ['./camera-button.component.scss']
})
export class CameraButtonComponent implements OnInit {
  ehBrowser = false; /* condiciona a plataforma e se vai ter a opção de camera ou não habilitada ao usuário */

  constructor(
    private cameraService: CameraService,
    private plataformaService: PlataformaService,
    private overlayService: OverlayService,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.ehBrowser = this.plataformaService.ehBrowser();
  }

  /*
  seleciona opção de foto salva em diretório. Aqui é verificado se a opção de arquivo veio de uma plataforma browser ou mobile.
  dependendo da opção ele chama o metodo específico
  */
  selecionaOpcaoArquivo() {
    this.plataformaService.ehBrowser()
      ? this.selecionaFotoPeloBrowser()
      : this.selecionaFotoPeloDispositivoMobile(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  /*
  seleciona pela janela de arquivos do pc para carregamento de fotos
  */
  selecionaFotoPeloBrowser() {
    this.overlayService.alert({ message: 'É um browser!' });
  }

  /*
  seleciona a opção de foto através de um dispositivo mobile
  */
  async selecionaFotoPeloDispositivoMobile(tipoCaminho: PictureSourceType) {
    await this.cameraService.selecionaFotoPeloDispositivoMobile(tipoCaminho).then((foto: string) => {
      window.localStorage.setItem('caminhoFotoUsuario', foto);
    });
  }
}
