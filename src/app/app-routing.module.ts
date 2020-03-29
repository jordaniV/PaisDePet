import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/signin/signin.module#SigninPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canLoad: [AuthGuard] },
  { path: 'meuspets', loadChildren: './pages/meus-pets/meus-pets.module#MeusPetsPageModule', canLoad: [AuthGuard] },
  { path: 'recuperarsenha', loadChildren: './auth/recuperar-senha/recuperar-senha/recuperar-senha.module#RecuperarSenhaPageModule' },
  { path: 'notificacao', loadChildren: './shared/pages/modal-notificacao/modal-notificacao.module#ModalNotificacaoPageModule' },
  { path: '**', loadChildren: './pages/erros/erros.module#ErrosModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
