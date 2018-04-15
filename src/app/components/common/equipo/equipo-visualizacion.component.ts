import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EquipoService } from '../../../services/entity-services/index';
import { IEquipo } from '../../../entities/index';
import { FileService } from '../../../services/entity-services/file.service';
import { IJugador } from '../../../entities/interfaces/index';
import { Equipo, Usuario } from '../../../entities/index';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmationDialog } from '../../common/dialog/index';

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
    equipo: Equipo = new Equipo();
    dt: IJugador = new IJugador();
    representante: IJugador = new IJugador();
    nombre_torneo: String;
    escudo: String;
    equipacion: String;
    user: Usuario;
    esAdmin: boolean = false;
    dialogRef: MatDialogRef<ConfirmationDialog>;


    constructor(
        public equipoService: EquipoService,
        public fileService: FileService,
        public route: ActivatedRoute,
        public dialog: MatDialog

    ) { }

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
                    if (jugador.rol == 'representante') {
                        this.representante = jugador;
                    }
                    this.lsJugadores.push(jugador);
                }
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

    desvincularJugador(id_jugador: number) {
        this.dialogRef = this.dialog.open(ConfirmationDialog, {
            height: '200px',
            width: '350px',
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = "Se desvinculará el jugador de este equipo."

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.equipoService.desvincularJugador(id_jugador).subscribe(
                    data => {
                        if (data) {
                            window.location.reload();
                        }
                    },
                    error => {
                        error.json()['Message'];
                    });

            }
            this.dialogRef = null;
        });

    }
}