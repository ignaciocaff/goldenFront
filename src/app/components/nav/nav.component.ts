import { Component, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';
@Component({
    selector: 'nav',
    moduleId: module.id,
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    providers: []
})
export class NavComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    jugadoresCarga_Click() {
        this.router.navigate(['home/jugadores-carga']);
        console.error("Esta entrando aca");
    }
}