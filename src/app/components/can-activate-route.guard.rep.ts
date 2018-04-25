import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Usuario } from '../entities/index'

@Injectable()
export class CanActivateRouteGuardRepre implements CanActivate {
    usuario: Usuario;
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        this.usuario = JSON.parse(sessionStorage.getItem('currentUser'));
        if (this.usuario && (this.usuario.perfil.id_perfil == 1) || this.usuario.perfil.id_perfil == 2) {
            return true;
        } else {
            this.router.navigate(['home/noticias']);
            return false;
        }

    }
}