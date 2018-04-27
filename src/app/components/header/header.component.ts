import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoginComponent } from '../common/login/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'header',
    moduleId: module.id,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: []
})
export class HeaderComponent {
    @ViewChild(LoginComponent) login: LoginComponent;

    items: Array<any> = [];
    constructor(
        private router: Router,
    ) {
        this.items = [
            { name: 'assets/escudos/22 dormida.png' },
            { name: 'assets/escudos/alfiado.png' },
            { name: 'assets/escudos/almafuerte.png' },
            { name: 'assets/escudos/apostoles.png' },
            { name: 'assets/escudos/black pipol.png' },
            { name: 'assets/escudos/camorra.png' },
            { name: 'assets/escudos/cañuelas.png' },
            { name: 'assets/escudos/casa nilda1.png' },
            { name: 'assets/escudos/catedral.png' },
            { name: 'assets/escudos/cvra.png' },
            { name: 'assets/escudos/escudo.png' },
            { name: 'assets/escudos/expulsados.png' },
            { name: 'assets/escudos/invitacion XI.png' },
            { name: 'assets/escudos/la cruzada.png' },
            { name: 'assets/escudos/la quinta.png' },
            { name: 'assets/escudos/lapepenoll.png' },
            { name: 'assets/escudos/los mas mas.png' },
            { name: 'assets/escudos/Mala junta.png' },
            { name: 'assets/escudos/Palito fc.png' },
            { name: 'assets/escudos/parque.png' },
            { name: 'assets/escudos/perfil bajo.png' },
            { name: 'assets/escudos/pura quimica.png' },
            { name: 'assets/escudos/taladro2.png' },
            { name: 'assets/escudos/viejo algarrobo.png' },
            { name: 'assets/escudos/Zona Sur.png' }]
    }

    noticias_Click() {
        this.router.navigate(['home/noticias']);
    }
}
