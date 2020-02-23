import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  constructor(private platform: Platform) { }

  ehBrowser() {
    return this.platform.is('desktop');
  }
}
