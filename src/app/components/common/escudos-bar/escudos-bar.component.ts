import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoginComponent } from '../../common/login/index';
import { Subscription } from 'rxjs/Subscription';
import { TorneoEmitter } from '../../../services/common-services/index';
import { FileService } from '../../../services/entity-services/file.service';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { EquipoService } from '../../../services/entity-services/index';
import { IEquipo } from '../../../entities/index';


@Component({
    selector: 'escudos',
    moduleId: module.id,
    templateUrl: './escudos-bar.component.html',
    styleUrls: ['./escudos-bar.component.css'],
    providers: []
})
export class EscudosComponent implements OnInit, DoCheck {
    @ViewChild(LoginComponent) login: LoginComponent;
    nombre: String;
    images: Array<any> = [];
    id_torneo: Number;

    lsEquipos = new Array<IEquipo>();

    constructor(
        private torneoEmiiter: TorneoEmitter, 
        private fileService: FileService, 
        public equipoService: EquipoService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.nombre = sessionStorage.getItem('torneo');
        this.torneoEmiiter.onMyEvent.subscribe((value: string) => this.nombre = value
        );

        var id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.equipoService.getAllPorTorneo(id_torneo).subscribe(
            data => {
                this.lsEquipos = [];
                for (var j = 0; j < data.length; j++) {
                    var equipo = new IEquipo();
                    equipo.id_equipo = data[j]['id_equipo'];
                    equipo.nombre = data[j]['nombre'];
                    equipo.logo = data[j]['logo'];
                    this.lsEquipos.push(equipo);

                }
                for (let i = 0; i < this.lsEquipos.length; i++) {
                    this.fileService.getImagesByEquipo(this.lsEquipos[i].logo).subscribe(
                        data => {
                            if (data['ImagePath'] != null) {
                                this.lsEquipos[i].imagePath = data['ImagePath'];
                            }
                        },
                        error => {
                        });
                }
            },
            error => {
                error.json()['Message'];
            });
    }

    verEquipo(id_equipo: number) {
/*         this.router.navigate(['home/equipo/' + id_equipo]);
        window.location.reload(); */
    }

    ngDoCheck() {
        if (this.id_torneo !== Number(sessionStorage.getItem('id_torneo'))) {
            this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
            this.getEscudos();
        }
    }
    getEscudos() {
        this.fileService.getImagesByTorneo(this.id_torneo).subscribe(
            data => {
                this.images = [];
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        this.images.push(data[i]);
                    }
                }
            },
            error => { }
        );
    }
}
