import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';
import { ParserService } from '../../../services/common-services/index';
import {
    Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
    Turno, IEquipo, IPartido, Partido
} from '../../../entities/index';
import { EquipoService, ZonaService, HorarioService, CanchaService, FixtureService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FixtureDialog } from './index';
import { ConfirmationDialog } from '../../common/dialog/index';
import { AppConfig } from '../../../app.config';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'fixture-update',
    moduleId: module.id,
    templateUrl: './fixture-update.component.html',
    styleUrls: ['./fixture-update.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class FixtureUpdateComponent implements OnInit {
    dialogRef: MatDialogRef<FixtureDialog>;
    dialogRefBorrado: MatDialogRef<ConfirmationDialog>;

    fecha = new Fecha();
    zona = new Zona();
    partidos = new Array<IPartido>();
    lsCanchas = new Array<Cancha>();
    horarios = new Array<HorarioFijo>();

    equipos = new Array<IEquipo>();
    lsZonas = new Array<Zona>();
    local = new Array<IEquipo>();
    visitante = new Array<IEquipo>();
    cantidadPartidos: number;
    imagesEscudos: Array<any> = [];
    cantidadZonas: number;
    id_torneo: number;
    check: Boolean = false;

    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager,
        public horarioService: HorarioService, public canchaService: CanchaService, public parserService: ParserService,
        public fixtureService: FixtureService, public dialog: MatDialog,
        public config: AppConfig,
        private spinnerService: Ng4LoadingSpinnerService) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));

    }
    ngOnInit() {
        this.zonaService.getAll(this.id_torneo).subscribe(
            data => {
                this.lsZonas = [];
                for (var i = 0; i < data.length; i++) {
                    let zona: Zona;
                    zona = data[i];
                    if (zona.torneo.id_torneo != null) {
                        this.lsZonas.push(zona);
                    }
                }
            }, error => {

            }
        );

        this.horarioService.getAll().subscribe(
            data => {
                this.horarios = [];
                for (let i = 0; i < data.length; i++) {
                    var horario = new HorarioFijo();
                    horario = data[i];
                    this.horarios.push(horario);
                }
            },
            error => {
                error.json()['Message'];
            });

        this.canchaService.getAll().subscribe(
            data => {
                this.lsCanchas = [];
                for (let i = 0; i < data.length; i++) {
                    var cancha = new Cancha();
                    cancha = data[i];
                    this.lsCanchas.push(cancha);
                }
            },
            error => {
                error.json()['Message'];
            });

    }


    public obtenerPartidos(zona: Zona) {

        this.equiposPorZona(zona);
        this.cantidadPartidos = null;
        this.partidos = [];
        this.fixtureService.obtenerPartidos(this.fecha, this.id_torneo, this.zona.id_zona, ).subscribe(
            data => {
                this.partidos = data;
            }, error => {

            }
        );
    }

    public equiposPorZona(zona: Zona) {

        this.equipoService.getAllPorZona(zona.id_zona).subscribe(
            data => {
                this.equipos = [];
                for (var j = 0; j < data.length; j++) {
                    var equipo = new IEquipo();
                    if (this.id_torneo == data[j]['torneo']['id_torneo']) {
                        equipo.id_equipo = data[j]['id_equipo'];
                        equipo.nombre = data[j]['nombre'];
                        equipo.logo = data[j]['logo'];
                        this.equipos.push(equipo);
                    }
                }
                for (let i = 0; i < this.equipos.length; i++) {
                    this.fileService.getImagesByEquipo(this.equipos[i].logo).subscribe(
                        data => {
                            if (data['ImagePath'] != null) {
                                this.equipos[i].imagePath = data['ImagePath'];
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


    droppableItemClass = (item: any) => `${item.class} ${item.inputType}`;

    builderDrag(e: any) {
        const item = e.value;
        item.data = item.inputType === 'number' ?
            (Math.random() * 100) | 0 :
            Math.random().toString(36).substring(20);
    }


    canMove(e: any): boolean {
        return e.indexOf('Disabled') === -1;
    }

    public compararHorariosBack(partido: IPartido) {
        this.fixtureService.obtenerPartidosClub(partido).subscribe(
            data => {
                var partido = new IPartido();
                partido = data;
                if (partido.id_partido > 0) {
                    this.openConfirmationDialog(partido);
                }
            },
            error => {
                this.toastr.error("Intente nuevamente más tarde.", "Error!");
            }
        )
    }

    openConfirmationDialog(newValue) {
        this.dialogRef = this.dialog.open(FixtureDialog, {
            data: newValue,
            height: '60%',
            width: '65%',
            disableClose: false,

        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
            this.dialogRef = null;
        });
    }

    public compararHorarios(partido: IPartido) {

        if (partido.cancha.nombre != null && partido.cancha.nombre != undefined) {
            partido.cancha.id_cancha = this.lsCanchas.find(x => x.nombre == partido.cancha.nombre).id_cancha;
        }

        var fecha = new Date(this.fecha.fecha);
        var fechaToString = new Date(fecha.getTime() + (1000 * 60 * 60 * 24)).toDateString();

        if (partido.horario.inicio != null && partido.horario.inicio != undefined &&
            partido.horario.fin != null && partido.horario.fin != undefined) {
            var nuevoPartidoMomentoInicio = moment(fechaToString + " " + partido.horario.inicio);
            var nuevoPartidoMomentoFin = moment(fechaToString + " " + partido.horario.fin);

            if (nuevoPartidoMomentoFin.isBefore(nuevoPartidoMomentoInicio) || nuevoPartidoMomentoInicio.isAfter(nuevoPartidoMomentoFin)) {
                this.toastr.error("El horario de inicio debe ser anterior al de fin.", "Error!");
            }
            var duration = moment.duration(nuevoPartidoMomentoFin.diff(nuevoPartidoMomentoInicio));
            var minutes = duration.asMinutes();
            if (minutes != 90) {
                this.toastr.error("El horario de inicio y fin deben estar a 90 minutos.", "Error!");
            }
            partido.horario.id_horario = this.horarios.find(x => x.inicio == partido.horario.inicio && x.fin == partido.horario.fin
            ).id_horario;
        }

        var contador = 0;
        for (var i = 0; i < this.partidos.length; i++) {
            if (this.partidos[i].horario != null && this.partidos[i].horario.inicio != null
                && this.partidos[i].horario.fin != null) {
                var partidoMomentoInicio = moment(fechaToString + " " + this.partidos[i].horario.inicio);
                var partidoMomentoFin = moment(fechaToString + " " + this.partidos[i].horario.fin);
                if (partidoMomentoInicio.isBetween(nuevoPartidoMomentoInicio, nuevoPartidoMomentoFin, null, "[]") &&
                    partidoMomentoFin.isBetween(nuevoPartidoMomentoInicio, nuevoPartidoMomentoFin, null, "[]") &&
                    partido.cancha.id_cancha == this.partidos[i].cancha.id_cancha
                ) {
                    contador = contador + 1;
                }
            }
        }

        if (contador > 1) {
            //Dialogo
            this.toastr.error('Verifique los datos, tiene horarios y canchas repetidos.', "Error!");
        } else {
            if (partido.cancha.id_cancha > 0 && partido.horario.inicio != null && partido.horario.fin != null) {
                partido.fecha.fecha = this.fecha.fecha;
                this.compararHorariosBack(partido);
            }
        }
    }

    public dibujarPartidos() {
        try {
            for (var j = this.partidos.length - 1; j >= 0; j--) {

                if (this.partidos[j].local.length == 0 && this.partidos[j].visitante.length == 0) {
                    this.partidos.splice(j, 1);
                }
            }
        } catch (Exception) {
        }
        for (var i = 0; i < this.cantidadPartidos; i++) {
            this.partidos.push(new IPartido());
        }
    }

    enfrentamiento(obj: any) {
    }

    actualizarFecha() {
        this.spinnerService.show();
        var lsPartidos = new Array<Partido>();
        lsPartidos = this.parserService.parsePartidos(this.partidos, this.fecha);
        this.fixtureService.update(lsPartidos, this.zona.id_zona, this.id_torneo).subscribe(
            data => {
                this.toastr.success('Se actualizo correctamente la fecha.', "Exito!");
                this.limpiarCampos();
                this.spinnerService.hide();
            }, error => {
                this.toastr.error('Intente nuevamente más tarde.', "Error!");
                this.spinnerService.hide();
            }
        );
    }

    verificacionComponentes() {
        for (var i = 0; i < this.partidos.length; i++) {
            if (this.partidos[i].local.length == 0 || this.partidos[i].visitante.length == 0 ||
                this.partidos[i].cancha.id_cancha == null || this.partidos[i].horario.id_horario == null) {
                this.check = false;
            } else {
                this.check = true;
            }
        }
        return this.check;
    }

    limpiarCampos() {

        this.ngOnInit();
        this.partidos = [];
        this.cantidadPartidos = null;
        this.equipos = [];
    }

    limpiarComp() {
    }


    routeAlta() {
        this.router.navigate(['home/fixture-armado']);
    }

    routeModificacion() {
        this.router.navigate(['home/fixture-update']);
    }

    routeCambioFecha() {
        this.router.navigate(['home/fixture-update-fecha']);
    }

    routeInterzonal() {
        this.router.navigate(['home/fixture-interzonal']);
    }

    routeCambioFechaInterzonal(){
        this.router.navigate(['home/fixture-interzonal-fecha']);
    }

    eliminarPartido(partido: IPartido) {
        this.dialogRefBorrado = this.dialog.open(ConfirmationDialog, {
            height: '200px',
            width: '350px',
            disableClose: false
        });
        this.dialogRefBorrado.componentInstance.confirmMessage = "Se eliminara el partido de la fecha."

        this.dialogRefBorrado.afterClosed().subscribe(result => {
            if (result) {
                this.fixtureService.eliminarPartido(partido).subscribe(
                    data => {
                        this.toastr.success('El partido se elimino correctamente', 'Exito!');
                        this.obtenerPartidos(this.zona);

                    },
                    error => {
                        this.toastr.error('El partido ya no puede ser eliminado', 'Error!');
                    });

            }
            this.dialogRefBorrado = null;
        });
    }

    /*verificarFecha() {
        if (this.fecha.fecha != null && this.zona.id_zona != null) {
            this.fixtureService.verificarFecha(this.fecha, this.zona.id_zona, this.id_torneo).subscribe(
                data => {
                }, error => {
                    this.toastr.error('La fecha elegida ya fue creada, seleccione otra opción', 'Error');
                }
            );
        }
    }*/
}