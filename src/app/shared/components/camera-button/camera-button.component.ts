import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { PlataformaService } from '../../services/plataforma.service';
import { CameraService } from '../../services/camera.service';
import { PictureSourceType, Camera } from '@ionic-native/camera/ngx';
import { StorageService } from '../../services/storage.service';

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
    private storageService: StorageService,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.ehBrowser = this.plataformaService.ehBrowser();
  }

  /*
  seleciona opção de foto salva em diretório. Aqui é verificado se a opção de arquivo veio de uma plataforma browser ou mobile.
  dependendo da opção ele chama o metodo específico

  selecionaOpcaoArquivo() {
    this.plataformaService.ehBrowser()
      ? this.selecionaFotoPeloBrowser()
      : this.selecionaFotoPeloDispositivoMobile(this.camera.PictureSourceType.PHOTOLIBRARY);
  } */

  /*
  seleciona pela janela de arquivos do pc para carregamento de fotos
  */
  selecionaImagemPeloBrowser() {}

  /*
  seleciona a opção de foto através de um dispositivo mobile
  */
  async selecionaImagemPeloDispositivoMobile(tipoCaminho: PictureSourceType) {
    const loading = await this.overlayService.loading();
    await this.cameraService.selecionaImagemPeloDispositivoMobile(tipoCaminho).then((foto: string) => {
      this.storageService.setFoto(foto);
      loading.dismiss();
    });
  }
}
