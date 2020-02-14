import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ModalNotificacaoPage } from 'src/app/shared/components/modal-notificacao/modal-notificacao.page';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss']
})
export class RecuperarSenhaPage implements OnInit {
  emailForm: FormGroup;

  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private overlayService: OverlayService
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.emailForm.reset();
  }

  /*
  metodo getter do formulario responsável por validar as mensagens
  de erro no ion-note
  */
  get email(): FormControl {
    return this.emailForm.get('email') as FormControl;
  }

  /*
  retornar para a tela de login
  */
  retornarTelaLogin() {
    this.limpaFormulario();
    this.navCtrl.navigateRoot('/signin');
  }

  /*
  limpa o formulário
  */
  limpaFormulario() {
    this.emailForm.setValue({
      email: ''
    });
  }

  /*
  metodo que alimenta os parametros do modal de notificação
  */
  async preencheCamposParaModalNotificacoes() {

    await this.overlayService.modal({
      component: ModalNotificacaoPage,
      componentProps: {
        txtPrincipal:  'Um email foi enviado para alteração da sua senha. Obrigado.',
        txtBotao: 'Retornar a página de login',
        icone: 'checkmark-circle-outline'
      }
    });
  }

  /*
  implementa o metodo de redefinição de senha
  */
  redefinirSenha() {
    const auth = firebase.auth();
    const email = this.emailForm.get('email').value;
    console.log(email);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.preencheCamposParaModalNotificacoes();
        this.limpaFormulario();
      })
      .catch(erro => this.overlayService.alert({ message: erro }));
    console.log(this.emailForm.value);
  }
}
