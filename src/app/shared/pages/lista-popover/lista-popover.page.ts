import { Component, OnInit } from '@angular/core';
import { PlataformaService } from 'src/app/shared/services/plataforma.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
import { OverlayService } from 'src/app/shared/services/overlay.service';

@Component({
  selector: 'app-lista-popover',
  templateUrl: './lista-popover.page.html',
  styleUrls: ['./lista-popover.page.scss']
})
export class ListaPopoverPage implements OnInit {
  ehBrowser = false; // condiciona a plataforma e se vai ter a opção de camera ou não habilitada ao usuário
  foto = '';
  constructor(
    private plataformaService: PlataformaService,
    private overlayService: OverlayService,
    private popoverCtrl: PopoverController,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.ehBrowser = this.plataformaService.ehBrowser();
  }

  /*
  seleciona opção de foto salva em diretório. Aqui é verificado se a opção de arquivo veio de uma plataforma browser ou mobile.
  dependendo da opção ele chama o metodo específico
  */
  selecionaMenuArquivo() {
    this.plataformaService.ehBrowser()
      ? this.selecionaFotoPeloBrowser()
      : this.selecionaFotoPelaCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  /*
  seleciona pela janela de arquivos do pc para carregamento de fotos
  */
  selecionaFotoPeloBrowser() {
    this.overlayService.alert({ message: 'É um browser!' });
  }

  /*
  seleciona a opção de foto pela camera
  */
  selecionaFotoPelaCamera(tipoCaminho: PictureSourceType) {
    this.foto = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      targetWidth: 100,
      targetHeight: 100,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      sourceType: tipoCaminho
    };

    this.camera
      .getPicture(options)
      .then(
        imageData => {
          const base64image = 'data:image/jpeg;base64,' + imageData;
          this.foto = base64image;
          this.popoverCtrl.dismiss();
        },
        error => {
          this.overlayService.alert({ message: error });
          this.popoverCtrl.dismiss();
          console.error(error);
        }
      )
      .catch(error => {
        this.overlayService.alert({ message: error });
        this.popoverCtrl.dismiss();
        console.error(error);
      });
  }
}
