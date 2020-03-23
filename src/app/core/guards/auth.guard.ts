import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, take } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /* verifica se o usuario esta autenticado (estaAutenticado). Caso esteja ele não vai fazer nada ( retorna booleano true)
  se não estiver vai bloquear automaticamente e redirecionar o usuário para a tela de login
  tap = serve apenas para executar uma lógica qualquer*/
  private verificaEstadoAutenticacao(redirect: string): Observable<boolean> {
    return this.authService.estaAutenticado.pipe(
      tap(estaAutenticado => {
        if (!estaAutenticado) {
          this.router.navigate(['/signin'], {
            queryParams: { redirect }
          });
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificaEstadoAutenticacao(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const url = segments.map(s => `/${s}`).join('');
    return this.verificaEstadoAutenticacao(url).pipe(take(1));
  }
}
