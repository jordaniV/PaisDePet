import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { ModalNotificacaoPage } from 'src/app/shared/pages/modal-notificacao/modal-notificacao.page';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CameraService } from 'src/app/shared/services/camera.service';
import { PictureSourceType } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss']
})
export class SigninPage implements OnInit {
  authForm: FormGroup;
  authProviders = AuthProvider;
  foto = '';
  usuario: firebase.User;

  /*
  configs que parametrizam a alternância entre tela de login e cadastro
  */
  configs = {
    isSignIn: true,
    action: 'Entrar',
    actionChange: 'Nova Conta'
  };

  /* form name atribuido quando queremos criar uma nova conta */
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private authService: AuthService,
    private overlayService: OverlayService,
    private storageService: StorageService,
    private cameraService: CameraService
  ) {} /* ao rodar a aplicação não vai aparecer o menu */

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.limpaFormulario();
    this.verificaSeExisteFotoNoLocalStorage();
  }

  /* verifica se existe foto armazenada no localstorage */
  verificaSeExisteFotoNoLocalStorage() {
    if (window.localStorage.length === 0) {
      this.foto = '';
    } else {
      this.foto = this.storageService.getFoto();
    }
  }

  /*
  limpa o formulário
  */
  limpaFormulario() {
    this.authForm.patchValue({
      email: '',
      senha: ''
    });
  }

  /*
  metodos getters que recebem as propriedades do formulario
  */
  get nome(): FormControl {
    return this.authForm.get('nome') as FormControl;
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get senha(): FormControl {
    return this.authForm.get('senha') as FormControl;
  }
  // =======================================================

  /*
  Pego as credenciais passando para o metodo autenticacao os parametros abaixo e caso
  sucesso será redirecionado.
  OBS: como estamos trabalhando com async/await precisamos utilizar o bloco try...catch
  */
  async signin(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      /* executado caso nao tenha nenhum erro */
      const credencial = await this.authService.autenticacao({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      if (this.configs.isSignIn) {
        /* caso seja login */
        this.overlayService.toast({
          message: 'Usuário autenticado com sucesso.'
        });
        this.limpaFormulario();
        this.navCtrl.navigateForward(
          this.activatedRoute.snapshot.queryParamMap.get('redirect') || '/home'
        );
      } else {
        this.preencheCamposParaModalNotificacoes();
        this.limpaFormulario();
        this.alternarEntreLoginCadastro();
      }
    } catch (e) {
      /* chamado quando acontecer um erro */
      console.log('Erro: ', e);
      await this.overlayService.toast({
        message: e.message
      });
    } finally {
      /* sempre é executado, caso tenha sucesso ou não */
      loading.dismiss();
    }
  }

  /*
  Troco os nomes dos elementos de login para cadastro, e incluo o formControl do nome
  */
  alternarEntreLoginCadastro(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Entrar' : 'Cadastrar';
    this.configs.actionChange = isSignIn ? 'Nova Conta' : 'Já tenho uma conta';
    !isSignIn
      ? this.authForm.addControl('nome', this.nameControl)
      : this.authForm.removeControl('nome');
  }

  /*
  recuperar senha
  somente para login via email
  */
  recuperaSenha() {
    this.navCtrl.navigateRoot('/recuperar-senha');
  }

  /*
  ao clicar na imagem aparece a mensagem do desenvolvedor
  */
  segredo() {
    this.overlayService.alert({
      header: 'Desenvolvido por:',
      subHeader: 'Vinicius Jordani',
      message: 'jordani.developer@gmail.com',
      buttons: [
        {
          text: 'Fechar',
          handler: () => {
            return;
          }
        }
      ]
    });
  }

  /*
  metodo que alimenta os parametros do modal de notificação
  */
  async preencheCamposParaModalNotificacoes() {
    await this.overlayService.modal({
      component: ModalNotificacaoPage,
      componentProps: {
        txtPrincipal: 'Usuário cadastrado com sucesso!',
        txtBotao: 'Acessar Pais de Pet',
        icone: 'checkmark-circle-outline',
        rota: '/signin'
      }
    });
  }
}
