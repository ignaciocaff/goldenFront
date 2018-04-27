import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EquipoService } from '../../../services/entity-services/index';
import { IEquipo, Jugador } from '../../../entities/index';
import { FileService } from '../../../services/entity-services/file.service';
import { IJugador } from '../../../entities/interfaces/index';
import { Equipo, Usuario } from '../../../entities/index';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmationDialog } from '../../common/dialog/index';
import { AppConfig } from '../../../app.config';


@Component({
    selector: 'equipo-visualizacion',
    moduleId: module.id,
    templateUrl: './equipo-visualizacion.component.html',
    styleUrls: ['./equipo-visualizacion.component.scss'],
    providers: []
})
export class EquipoVisualizacionComponent implements OnInit {

    id_equipo: number;
    lsJugadores = new Array<IJugador>();
    equipo = new Equipo();
    dt = new IJugador();
    goleador = new IJugador();
    representante = new IJugador();
    nombre_torneo: String;
    escudo: String;
    equipacion: String;
    user: Usuario;
    esAdmin: boolean = false;
    dialogRef: MatDialogRef<ConfirmationDialog>;
    private sub: any;
    id_torneo: number;


    constructor(
        public equipoService: EquipoService,
        public fileService: FileService,
        public route: ActivatedRoute,
        public dialog: MatDialog,
        public config: AppConfig
    ) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id_equipo = +params['id'];

            this.nombre_torneo = (sessionStorage.getItem('torneo'));

            this.equipoService.getiJugadoresByIdEquipo(this.id_equipo, this.id_torneo).subscribe(
                data => {
                    this.lsJugadores = [];
                    for (let i = 0; i < data.length; i++) {
                        var jugador = new IJugador();
                        jugador = data[i];
                        if (jugador.rol == 'director_tecnico') {
                            this.dt = jugador;
                        }
                        if (jugador.rol == 'representante') {
                            this.representante = jugador;
                        }
                        this.lsJugadores.push(jugador);
                    }
                    this.buscarGoleador();
                },
                error => {
                    error.json()['Message'];
                });

            this.equipoService.getById(this.id_equipo).subscribe(
                data => {
                    this.equipo = data;
                    this.cargarImagenesEquipo();
                },
                error => { error.json()['Message']; }
            );

            this.user = JSON.parse(sessionStorage.getItem('currentUser'));
            if (this.user != null) {
                if (this.user.perfil.id_perfil == 1) {
                    this.esAdmin = true;
                }
            }
        });
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
    
    buscarGoleador() {
        this.goleador = new IJugador();
        this.goleador.goles = 0;
        for (let i = 0; i < this.lsJugadores.length; i++) {
            if (this.goleador.goles < this.lsJugadores[i].goles) {
                this.goleador = this.lsJugadores[i];
            }
        }
    }
}