import { Component, Directive, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoginComponent } from '../../common/login/index';
import { Subscription } from 'rxjs/Subscription';
import { TorneoEmitter } from '../../../services/common-services/index';
import { FileService } from '../../../services/entity-services/file.service';
import { DoCheck, AfterViewChecked, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { EquipoService } from '../../../services/entity-services/index';
import { IEquipo } from '../../../entities/index';
import { AppConfig } from '../../../app.config';

@Component({
    selector: 'escudos',
    moduleId: module.id,
    templateUrl: './escudos-bar.component.html',
    styleUrls: ['./escudos-bar.component.css'],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class EscudosComponent implements OnInit, AfterViewInit, DoCheck {
    @ViewChild(LoginComponent) login: LoginComponent;
    nombre: String;
    images: Array<any> = [];
    id_torneo: number;

    lsEquipos = new Array<IEquipo>();
    cantVisibles = 10;
    constructor(
        private torneoEmiiter: TorneoEmitter,
        private fileService: FileService,
        public equipoService: EquipoService,
        private router: Router,
        public config: AppConfig
    ) {

    }
    ngOnInit() {
        this.nombre = sessionStorage.getItem('torneo');
        this.torneoEmiiter.onMyEvent.subscribe((value: string) => this.nombre = value
        );
        var id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.equipoService.getAllIEquipoPorTorneo(id_torneo).subscribe(
            data => {
                this.lsEquipos = [];
                for (var j = 0; j < data.length; j++) {
                    var equipo = new IEquipo();
                    equipo.id_equipo = data[j]['id_equipo'];
                    equipo.nombre = data[j]['nombre'];
                    equipo.logo = data[j]['logo'];
                    equipo.imagePath = data[j]['imagePath'];

                    if (equipo && equipo.imagePath) {
                        this.lsEquipos.push(equipo);
                    }
                }
            },
            error => {
                error.json()['Message'];
            });

    }

    verEquipo(id_equipo: number) {
        this.router.navigate(['home/equipo/' + id_equipo]);
    }

    ngAfterViewInit() {

    }

    ngDoCheck() {
        if (this.id_torneo !== Number(sessionStorage.getItem('id_torneo'))) {
            this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
            this.ngOnInit();
        }
    }
}
