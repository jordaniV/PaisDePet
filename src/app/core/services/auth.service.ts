import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { User, AuthProvider, AuthOptions } from './auth.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { PlataformaService } from './plataforma.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* como é um observable por convensão se coloca o $ no final*/
  statusDaAutenticacao$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    private plataformaService: PlataformaService
  ) {
    /* recebe o estado da autenticação */
    this.statusDaAutenticacao$ = this.afAuth.authState;
  }

  /*
  indica se o usuario esta autenticado ou não.
  Pega o status da autenticação, faz um pipe nela e com um map pegaa propriedade user.
  caso user seja nulo então não esta autenticado e por consequencia retornara false
  caso contrario retorna true
  */
  get estaAutenticado(): Observable<boolean> {
    return this.statusDaAutenticacao$.pipe(map(user => user !== null));
  }

  /*
  retorna as informações desejadas
  */
  getInfoUsuario() {
    return this.statusDaAutenticacao$;
  }

  /*
  tem como função orquestrar o processo de autenticação
  crio uma variavel que recebe uma promise de userCredencial. Faço uma verificação
  de caso negação do provider email entao ele esta tentando se autenticar com facebook
  entao o operation recebe o metodo de loginComPopup recebendo o provider.
  case nao seja no facebook, entao sera com login e senha, e verificamos se é um login
  ou um cadastro novo usando o if ternário, passando sempre a propriedade user que
  recebe nome, email e senha.
  */
  autenticacao({ isSignIn, user, provider }: AuthOptions): Promise<auth.UserCredential> {
    let operacao: Promise<auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operacao = this.loginComPopup(provider);
    } else {
      operacao = isSignIn ? this.loginComEmailESenha(user) : this.cadastrarComEmailESenha(user);
    }
    return operacao;
  }

  /*
  faz o processo de logout do usuario na aplicação
  */
  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  /*
  efetuar o login no sistema com email e senha
  */
  private loginComEmailESenha({ email, senha }: User): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, senha);
  }

  /*
  cadastrar novo usuario
  como o metodo aceita apenas email e senha precisamos pegar as credenciais que
  retornam do createUser... e chamamos o metodo user.updateProfile para adicionarmos
  novos dados como o nome e uma url de foto.
  */
  private cadastrarComEmailESenha({ email, senha, nome }: User): Promise<auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, senha).then(credencials =>
      credencials.user
        .updateProfile({
          displayName: nome,
          photoURL: null
        })
        .then(() => credencials)
    );
  }

  /*
  Aqui consta a logica de login quando usamos algum popup, como o facebook ou o google.
  Neste caso criamos um case para que caso queira adicionar novas formas de login
  podemos incluir sem precisar mexer na lógica, apenas gerando um novo "case".
  */
  private async loginComPopup(provider: AuthProvider): Promise<auth.UserCredential> {

    switch (provider) {
      case AuthProvider.Facebook: // referenciando o enum no auth.types.ts
        if (!this.plataformaService.ehBrowser()) {
          await this.facebook.login(['email']).then((result: FacebookLoginResponse) => {
            const fbCredential = firebase.auth.FacebookAuthProvider.credential(
              result.authResponse.accessToken
            );
            // firebase.auth().signInWithCredential(fbCredential);
            return this.afAuth.auth.signInWithCredential(fbCredential);
          });
        } else {
          return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
        }
        break;
    }
  }
}
