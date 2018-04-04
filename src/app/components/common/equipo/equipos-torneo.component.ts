import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EquipoService } from '../../../services/entity-services/index';
import { IEquipo } from '../../../entities/index';
import { FileService } from '../../../services/entity-services/file.service';

@Component({
    selector: 'equipos-torneo',
    moduleId: module.id,
    templateUrl: './equipos-torneo.component.html',
    styleUrls: ['./equipos-torneo.component.scss'],
    providers: []
})
export class EquiposTorneoComponent {

    lsEquipos = new Array<IEquipo>();

    constructor(
        public equipoService: EquipoService,
        public fileService: FileService,
        private router: Router,
    ) { }

    ngOnInit() {
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

    // METODOS-----------------------------------------------------------------------------
    
    verEquipo(id_equipo: number) {
        this.router.navigate(['home/equipo/' + id_equipo]);
    }
}