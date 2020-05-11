import { Injectable } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { OverlayService } from './overlay.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  foto = '';

  constructor(
    private camera: Camera,
    private overlayService: OverlayService
  ) {}

  /*
  seleciona a opção de foto através de um dispositivo mobile
  Se o caminho será pela camera ou foto armazenada no celular
  vai depender do parametro passado atraves de tipoCaminho
  */
  async selecionaImagemPeloDispositivoMobile(tipoCaminho: PictureSourceType) {
    this.foto = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      targetWidth: 500,
      targetHeight: 500,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      sourceType: tipoCaminho
    };

    /* testar esse código */
    /*this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        return this.foto = base64Image;
      },
      (err) => {
        // Handle error
      }
    ); */

    try {
      try {
        const imageData = await this.camera.getPicture(options);
        const base64image = 'data:image/jpeg;base64,' + imageData;
        /* retorno da foto */
        return this.foto = base64image;
      } catch (error) {
        this.overlayService.alert({ message: error });
        console.error(error);
      }
    } catch (error1) {
      this.overlayService.alert({ message: error1 });
      console.error(error1);
    }
  }
}
