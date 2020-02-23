import { Injectable } from '@angular/core';

import { AlertController, LoadingController, ToastController, ModalController, PopoverController } from '@ionic/angular';
import { AlertOptions, LoadingOptions, ToastOptions, ModalOptions, PopoverOptions } from '@ionic/core';

/*
aqui consta os metodos de sobreposição, mensagens como alert, toast e loading, qualquer
outro metodo de apresentação de mensagens deve ser incluso nesta classe
*/

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) { }

  async alert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }

  async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      ...options
    });
    await loading.present();
    return loading;
  }

  async toast(options?: ToastOptions): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok',
      ...options
    });
    await toast.present();
    return toast;
  }

  async modal(options?: ModalOptions): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      ...options
    });
    await modal.present();
    return modal;
  }

  async popover(options?: PopoverOptions): Promise<HTMLIonPopoverElement> {
    const popover = await this.popoverCtrl.create({
      keyboardClose: true,
      ...options
    });
    await popover.present();
    return popover;
  }
}
