import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss']
})
export class SigninPage implements OnInit {

  authForm: FormGroup;
  authProviders = AuthProvider;

  configs = {
    isSignIn: true,
    action: 'Entrar',
    actionChange: 'Nova Conta'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private overlayService: OverlayService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['admin@paisdepet.com', [Validators.required, Validators.email]],
      senha: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false); // ao rodar a aplicação não vai aparecer o menu
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true); // quando o ciclo de vida da pagina acabar( sair da pagina de login) ele libera o menu novamente
  }

  get nome(): FormControl {
    return this.authForm.get('nome') as FormControl;
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get senha(): FormControl {
    return this.authForm.get('senha') as FormControl;
  }

  /*
  Pego as credenciais passando para o metodo autenticacao os parametros abaixo e caso
  sucesso será redirecionado.
  OBS: como estamos trabalhando com async/await precisamos utilizar o bloco try...catch
  */
  async signin(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try { // executado caso nao tenha nenhum erro
      const credenciais = await this.authService.autenticacao({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log('Usuario Autenticado', credenciais);
      this.route.navigate(['home']);
    } catch (e) { // chamado quando acontecer um erro
      console.log('Erro: ', e);
      await this.overlayService.toast({
        message: e.message
      });
    } finally { // sempre é executado, caso tenha sucesso ou não
      loading.dismiss();
    }
  }

  /*
  Troco os nomes dos elementos de login para cadastro, e incluo o formControl do nome
  */
  novaConta(): void {
   this.configs.isSignIn = !this.configs.isSignIn;
   const { isSignIn } = this.configs;
   this.configs.action = isSignIn ? 'Entrar' : 'Cadastrar';
   this.configs.actionChange = isSignIn ? 'Nova Conta' : 'Já tenho uma conta';
   !isSignIn
     ? this.authForm.addControl('nome', this.nameControl)
     : this.authForm.removeControl('nome');
  }
}
