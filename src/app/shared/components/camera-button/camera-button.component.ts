import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  file;

  @Output() caminhoFoto = new EventEmitter(); /* envia a foto do component para atela de signin  */

  constructor(
    private cameraService: CameraService,
    private plataformaService: PlataformaService,
    private overlayService: OverlayService,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.ehBrowser = this.plataformaService.ehBrowser();
  }

  /* abre o  action sheet */
  abreOpcoesDeFoto() {
    this.overlayService.actionSheet({
      header: 'Selecionar foto...',
      buttons: [
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.selecionaImagemPeloDispositivoMobile(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Galeria',
          icon: 'folder-open',
          handler: () => {
            this.selecionaImagemPeloDispositivoMobile(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
  }

  /*
  seleciona pela janela de arquivos do pc para carregamento de fotos
  */
  selecionaImagemPeloBrowser($event): void {
    this.file = URL.createObjectURL($event.target.files[0]);
    this.caminhoFoto.emit(this.file);
  }

  /*
  seleciona a opção de foto através de um dispositivo mobile
  */
  async selecionaImagemPeloDispositivoMobile(tipoCaminho: PictureSourceType) {
    const loading = await this.overlayService.loading();
    await this.cameraService
      .selecionaImagemPeloDispositivoMobile(tipoCaminho)
      .then((foto: string) => {
        this.caminhoFoto.emit(foto);
        loading.dismiss();
      });
  }
}
