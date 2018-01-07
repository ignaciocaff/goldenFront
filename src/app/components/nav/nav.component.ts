import { Component, ViewChild, Input, SimpleChange, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';
import { Location } from '@angular/common';
import { Usuario } from '../../entities/index'
import { OnChanges, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { SharedService } from '../../services/index'
@Component({
    selector: 'nav',
    moduleId: module.id,
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    providers: []
})
export class NavComponent implements OnInit {

    user: Usuario;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: SharedService
    ) {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.userService.newUserSubject.subscribe(
            data => this.user = data
        );
    }

    jugadoresCarga_Click() {
        this.router.navigate(['home/jugadores-carga']);
    }

    torneoCarga_Click() {
        this.router.navigate(['home/torneo-carga']);
    }
}