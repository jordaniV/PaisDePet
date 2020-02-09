import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss']
})
export class RecuperarSenhaPage implements OnInit, OnDestroy {

  emailForm: FormGroup;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private formBuilder: FormBuilder
  ) { this.menuCtrl.enable(false); }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.menuCtrl.enable(false);
    this.emailForm.reset();
  }

  /*
  metodo getter do formulario responsável por validar as mensagens
  de erro no ion-note
  */
  get email(): FormControl {
    return this.emailForm.get('email') as FormControl;
  }

  ngOnDestroy(): void {
    this.menuCtrl.enable(true); // quando o ciclo de vida da pagina acabar( sair da pagina de login) ele libera o menu novamente
  }

  /*
  retornar para a tela de login
  */
  retornarTelaLogin() {
    this.router.navigate(['signin']);
  }

  redefinirSenha() {
    console.log(this.emailForm.value);
  }
}
