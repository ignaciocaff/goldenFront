import { Component, ViewChild, Input, SimpleChange, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';
import { Location } from '@angular/common';
import { Usuario, Torneo } from '../../entities/index'
import { OnChanges, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { SharedService, TorneoService } from '../../services/index';
import { TorneoEmitter, TorneoLSEmitter } from '../../services/common-services/index';
@Component({
    selector: 'menu',
    moduleId: module.id,
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    providers: [TorneoService]
})
export class NavComponent implements OnInit {
    torneo: Torneo = new Torneo();
    user: Usuario;
    public lsTorneos = new Array<Torneo>();
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: SharedService,
        private torneoService: TorneoService,
        private torneoEmitter: TorneoEmitter,
        private torneoLsEmitter: TorneoLSEmitter
    ) {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));

        this.torneoLsEmitter.torneoUpdate.subscribe((value) => {
            this.lsTorneos.push(value);
        }
        );
    }

    ngOnInit() {
        this.userService.newUserSubject.subscribe(
            data => this.user = data
        );

        this.torneoService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.length; i++) {
                    let torneo = data[i];
                    this.lsTorneos.push(torneo);
                }

            }, error => {

            }
        );
    }

    jugadoresCarga_Click() {
        this.router.navigate(['home/jugadores-carga']);
    }

    torneoCarga_Click() {
        this.router.navigate(['home/torneo-carga']);
    }

    equipoCarga_Click() {
        this.router.navigate(['home/equipo-carga']);
    }

    configuraciones_Click() {
        this.router.navigate(['home/configuraciones']);
    }

    noticiaCarga_Click() {
        this.router.navigate(['home/noticia-carga']);
    }

    noticias_Click() {
        this.router.navigate(['home/noticias']);
    }

    canchaCarga_Click() {
        this.router.navigate(['home/canchas']);
    }

    zonaCarga_Click() {
        this.router.navigate(['home/zona-carga']);
    }
    resultadoCarga_Click() {
        this.router.navigate(['home/resultado-carga']);
    }
    reglasCarga_click() {
        this.router.navigate(['home/reglas']);
    }
    equipos_Click() {
        this.router.navigate(['home/equipos']);
    }

    reglamento_Click() {
        this.router.navigate(['home/reglamento']);
    }

    posiciones_Click() {
        this.router.navigate(['home/posiciones']);
    }

    goleadores_Click() {
        this.router.navigate(['home/goleadores']);
    }

    usuariosCarga_Click() {
        this.router.navigate(['home/usuarios']);
    }

    fixture_Click() {
        this.router.navigate(['home/fixture']);
    }

    resultados_Click() {
        this.router.navigate(['home/resultados']);
    }
    
    setTorneo(nombre: String, id_torneo: Number) {
        this.torneoService.getByName(nombre).subscribe(
            data => {
                this.torneo = data;
                sessionStorage.setItem('torneo', String(this.torneo.nombre));
                sessionStorage.setItem('id_torneo', String(this.torneo.id_torneo));
                sessionStorage.setItem('fase', String(this.torneo.fase.id_fase));
                this.router.navigate(['home/noticias']);
                this.torneoEmitter.trigger(this.torneo.nombre);
            },
            error => {

            }
        );
    }
}
