import { Component, OnInit } from '@angular/core';
import { PlataformaService } from 'src/app/core/services/plataforma.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-lista-popover',
  templateUrl: './lista-popover.page.html',
  styleUrls: ['./lista-popover.page.scss']
})
export class ListaPopoverPage implements OnInit {
  ehBrowser = false;
  foto = '';
  constructor(
    private plataformaService: PlataformaService,
    private overlayService: OverlayService,
    private popoverCtrl: PopoverController,
    private camera: Camera) {}

  ngOnInit() {
    this.ehBrowser = this.plataformaService.ehBrowser();
  }

  /*
  seleciona a foto para carregar no app. Verifica se foto vem de diretório
  ou direto da câmera
  */
  selecionaFoto(caminho: PictureSourceType): void {
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
      sourceType: caminho
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
