import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', loadChildren: './auth/signin/signin.module#SigninPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canLoad: [AuthGuard] },
  { path: 'meuspets', loadChildren: './meus-pets/meus-pets.module#MeusPetsPageModule', canLoad: [AuthGuard] },
  { path: 'recuperarsenha', loadChildren: './auth/recuperar-senha/recuperar-senha/recuperar-senha.module#RecuperarSenhaPageModule' },
  { path: 'notificacao', loadChildren: './shared/pages/modal-notificacao/modal-notificacao.module#ModalNotificacaoPageModule' },
  { path: '**', loadChildren: './erros/erros.module#ErrosModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
