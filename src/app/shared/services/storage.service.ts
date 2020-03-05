import { Injectable } from '@angular/core';

const CAMINHO_FOTO = 'caminhoFotoUsuario';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getFoto() {
    return window.localStorage.getItem(CAMINHO_FOTO);
  }

  setFoto(caminhoFoto: string) {
    return window.localStorage.setItem(CAMINHO_FOTO, caminhoFoto);
  }
}
