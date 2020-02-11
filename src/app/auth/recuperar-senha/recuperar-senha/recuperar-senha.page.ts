import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

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
    private formBuilder: FormBuilder
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
    this.navCtrl.navigateRoot('/signin');
  }

  redefinirSenha() {
    console.log(this.emailForm.value);
  }
}
