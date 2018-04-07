import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EquipoService } from '../../../services/entity-services/index';
import { IEquipo } from '../../../entities/index';
import { FileService } from '../../../services/entity-services/file.service';
import { IJugador } from '../../../entities/interfaces/index';
import { Equipo } from '../../../entities/index';


@Component({
    selector: 'equipo-visualizacion',
    moduleId: module.id,
    templateUrl: './equipo-visualizacion.component.html',
    styleUrls: ['./equipo-visualizacion.component.scss'],
    providers: []
})
export class EquipoVisualizacionComponent implements OnInit{

    id_equipo: number;
    lsJugadores = new Array<IJugador>();
    equipo: Equipo = new Equipo();
    dt: IJugador = new IJugador();
    representante: IJugador = new IJugador();
    nombre_torneo: string;
    escudo: string;
    equipacion: string;

    constructor(
        public equipoService: EquipoService,
        public fileService: FileService,
        public route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.id_equipo = this.route.snapshot.params['id']; 
        this.nombre_torneo = (sessionStorage.getItem('torneo'));

        this.equipoService.getiJugadoresByIdEquipo(this.id_equipo).subscribe(
            data => {
                this.lsJugadores = [];
                for (let i = 0; i < data.length; i++) {
                    var jugador = new IJugador();
                    jugador = data[i];
                    if (jugador.rol == 'director_tecnico') {
                        this.dt = jugador;
                    }
                    if(jugador.rol == 'representante') {
                        this.representante = jugador;
                    }
                    this.lsJugadores.push(jugador);
                }
            },
            error => {
                error.json()['Message'];
            });

        this.equipoService.getById(this.id_equipo).subscribe(
            data  => { 
                this.equipo = data;
                this.cargarImagenesEquipo();
             },
            error => { error.json()['Message']; }
        );
    }


    // METODOS-----------------------------------------------------------------------------

    cargarImagenesEquipo() {
        this.fileService.getImagesByEquipo(this.equipo.logo).subscribe(
            data => { this.escudo = data['ImagePath']; },
            error => { }
        );

        this.fileService.getImagesByEquipo(this.equipo.camiseta).subscribe(
            data => { this.equipacion = data['ImagePath']; },
            error => { }
        );
    }
}