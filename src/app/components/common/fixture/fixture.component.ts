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
import { AppConfig } from '../../../app.config';

@Component({
    selector: 'fixture',
    moduleId: module.id,
    templateUrl: './fixture.component.html',
    styleUrls: ['./fixture.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class FixtureComponent implements OnInit {
    dialogRef: MatDialogRef<FixtureDialog>;
    fecha = new Fecha();
    zona = new Zona();
    partidos = new Array<IPartido>();
    lsCanchas = new Array<Cancha>();
    horarios = new Array<HorarioFijo>();

    equipos = new Array<IEquipo>();
    lsZonas = new Array<Zona>();

    cantidadPartidos: number;
    imagesEscudos: Array<any> = [];
    cantidadZonas: number;
    id_torneo: number;
    check: Boolean = false;

    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager,
        public horarioService: HorarioService, public canchaService: CanchaService, public parserService: ParserService,
        public fixtureService: FixtureService, public dialog: MatDialog,
        public config: AppConfig) {
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

    public equiposPorZona(zona: Zona) {
        this.cantidadPartidos = null;
        this.partidos = [];
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

    local = new Array<IEquipo>();
    visitante = new Array<IEquipo>();

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

    public dibujarPartidos() {
        this.partidos = [];
        for (var i = 0; i < this.cantidadPartidos; i++) {
            this.partidos.push(new IPartido());
        }
    }

    enfrentamiento(obj: any) {
    }

    registrarFecha() {
        var lsPartidos = new Array<Partido>();
        lsPartidos = this.parserService.parsePartidos(this.partidos, this.fecha);
        this.fixtureService.create(lsPartidos, this.zona.id_zona, this.id_torneo).subscribe(
            data => {
                if (data) {
                    this.toastr.success('Se creo correctamente la fecha.', "Exito!");
                    this.limpiarCampos();
                }
            }, error => {
                this.toastr.error("La fecha seleccionada ya esta creada, dirijase a modificación.", "Error!");
            }
        );

    }

    verificacionComponentes() {
        for (var i = 0; i < this.partidos.length; i++) {
            if (this.partidos[i].local.length == 0 || this.partidos[i].visitante.length == 0) {
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
        this.fecha.fecha = new Date();
    }

    limpiarComp() {
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

        let contador = 0;
        var fecha = new Date(this.fecha.fecha);
        var fechaToString = new Date(fecha.getTime() + (1000 * 60 * 60 * 24)).toDateString();

        var nuevoPartidoMomentoInicio = moment(fechaToString + " " + partido.horario.inicio);
        var nuevoPartidoMomentoFin = moment(fechaToString + " " + partido.horario.fin);

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
            this.toastr.error('Verifique, tiene horarios y/o canchas repetidos.', "Error!");
        } else {
            if (partido.cancha.id_cancha > 0 && partido.horario.inicio != null && partido.horario.fin != null) {
                partido.fecha.fecha = this.fecha.fecha;
                this.compararHorariosBack(partido);
            }
        }
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

    verificarFecha() {
        if (this.fecha.fecha != null && this.zona.id_zona != null) {
            this.fixtureService.verificarFecha(this.fecha, this.zona.id_zona, this.id_torneo).subscribe(
                data => {
                }, error => {
                    this.toastr.error('La fecha elegida ya fue creada, seleccione otra opción', 'Error!');
                }
            );
        }
    }
}