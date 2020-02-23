import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  constructor(private platform: Platform) { }

  /* verifica se a plataforma é desktop */
  ehBrowser() {
    return this.platform.is('desktop');
  }
}
