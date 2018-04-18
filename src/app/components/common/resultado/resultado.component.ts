import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';
import { ParserService } from '../../../services/common-services/index';
import {
    Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
    Turno, IEquipo, IPartido, Partido, Jugador, Gol, Resultado, Sancion, TipoSancion
} from '../../../entities/index';
import { EquipoService, ZonaService, HorarioService, CanchaService, FixtureService, SancionService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialog } from '../../common/dialog/index';
import { SancionDialog, SancionDialogV } from './index';


@Component({
    selector: 'resultado',
    moduleId: module.id,
    templateUrl: './resultado.component.html',
    styleUrls: ['./resultado.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class ResultadoComponent implements OnInit {
    dialogRef: MatDialogRef<SancionDialog>;
    dialogRefV: MatDialogRef<SancionDialogV>;
    dialogRefBorrado: MatDialogRef<ConfirmationDialog>;

    fecha = new Fecha();
    zona = new Zona();
    partidos = new Array<IPartido>();
    lsCanchas = new Array<Cancha>();
    horarios = new Array<HorarioFijo>();
    jugadorVisitante = new Jugador();
    jugadorLocal = new Jugador();

    equipos = new Array<IEquipo>();
    lsZonas = new Array<Zona>();
    local = new Array<IEquipo>();
    visitante = new Array<IEquipo>();
    cantidadPartidos: number;
    imagesEscudos: Array<any> = [];
    cantidadZonas: number;
    id_torneo: number;
    check: Boolean = false;
    lsJugadoresLocal = new Array<Jugador>();
    lsJugadoresVisitante = new Array<Jugador>();
    fixture = new Fixture();
    lsFechasInicio = new Array<Fecha>();
    lsFechasFin = new Array<Fecha>();
    lsTiposSanciones = new Array<TipoSancion>();

    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager,
        public horarioService: HorarioService, public canchaService: CanchaService, public parserService: ParserService,
        public fixtureService: FixtureService, public dialog: MatDialog, public sancionService: SancionService) {
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

        this.sancionService.getAll().subscribe(
            data => {
                this.lsTiposSanciones = [];
                for (var i = 0; i < data.length; i++) {
                    let tipoSancion: TipoSancion;
                    tipoSancion = data[i];
                    this.lsTiposSanciones.push(tipoSancion);
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

        this.partidos = [];
        this.fixtureService.obtenerPartidos(this.fecha, this.zona.id_zona, this.id_torneo).subscribe(
            data => {
                this.partidos = data;

                for (var i = 0; i < this.partidos.length; i++) {

                    if (this.partidos[i].local) {
                        this.obtenerJugadoresLocal(this.partidos[i]);
                        this.partidos[i].lsGolesLocal = new Array<Gol>();
                        this.partidos[i].lsSancionesLocal = new Array<Sancion>();
                    }
                    if (this.partidos[i].visitante) {
                        this.obtenerJugadoresVisitante(this.partidos[i]);
                        this.partidos[i].lsGolesVisitante = new Array<Gol>();
                        this.partidos[i].lsSancionesVisitante = new Array<Sancion>();
                    }
                }
            }, error => {

            }
        );
    }


    obtenerJugadoresLocal(partido: IPartido) {
        this.equipoService.getJugadoresByIdEquipo(partido.local[0].id_equipo).subscribe(
            data => {
                this.lsJugadoresLocal = [];
                for (let i = 0; i < data.length; i++) {
                    var jugador = new Jugador();
                    jugador = data[i];
                    this.lsJugadoresLocal.push(jugador);
                }
                partido.local[0].lsJugadores = this.lsJugadoresLocal;
            },
            error => {
                error.json()['Message'];
            });
    }

    obtenerJugadoresVisitante(partido: IPartido) {
        this.equipoService.getJugadoresByIdEquipo(partido.visitante[0].id_equipo).subscribe(
            data => {
                this.lsJugadoresVisitante = [];
                for (let i = 0; i < data.length; i++) {
                    var jugador = new Jugador();
                    jugador = data[i];
                    this.lsJugadoresVisitante.push(jugador);
                }
                partido.visitante[0].lsJugadores = this.lsJugadoresVisitante;
            },
            error => {
                error.json()['Message'];
            });
    }

    onChangeLocal(obj: any) {

    }
    onChangeVisitante(obj: any) {

    }


    golLocal(partido: IPartido) {
        let gol = new Gol();
        gol.equipo.id_equipo = partido.local[0].id_equipo;
        gol.jugador = this.jugadorLocal;
        gol.partido.id_partido = partido.id_partido;
        //this.lsGolesLocal.push(gol);
        partido.lsGolesLocal.push(gol);
    }

    golVisitante(partido: IPartido) {
        let gol = new Gol();
        gol.equipo.id_equipo = partido.visitante[0].id_equipo;
        gol.jugador = this.jugadorVisitante;
        gol.partido.id_partido = partido.id_partido;
        // this.lsGolesVisitante.push(gol);
        partido.lsGolesVisitante.push(gol);
    }

    registrarResultado() {

        var lsPartidos = new Array<Partido>();
        lsPartidos = this.parserService.parseResultados(this.partidos);


        for (let i = 0; i < lsPartidos.length; i++) {

            if (lsPartidos[i].lsGoleadoresLocales.length ==
                lsPartidos[i].lsGoleadoresVisitantes.length) {
                lsPartidos[i].resultado.ganador.id_equipo = lsPartidos[i].local.id_equipo;
                lsPartidos[i].resultado.perdedor.id_equipo = lsPartidos[i].visitante.id_equipo;
                lsPartidos[i].resultado.empate = 1;
            } else if (lsPartidos[i].lsGoleadoresLocales.length
                > lsPartidos[i].lsGoleadoresVisitantes.length) {
                lsPartidos[i].resultado.ganador.id_equipo = lsPartidos[i].local.id_equipo;
                lsPartidos[i].resultado.perdedor.id_equipo = lsPartidos[i].visitante.id_equipo;
            } else {
                lsPartidos[i].resultado.ganador.id_equipo = lsPartidos[i].visitante.id_equipo;
                lsPartidos[i].resultado.perdedor.id_equipo = lsPartidos[i].local.id_equipo;
            }
        }

        console.error(lsPartidos);
        lsPartidos = [];

    }

    rojaLocal(partido: IPartido) {
    }

    rojaVisistante(partido: IPartido) {

    }

    openConfirmationDialogLocal(sancion, lsFechasInicio, lsFechasFin, lsTiposSancion, partido) {
        var conjunto = Array<any>();
        conjunto.push(sancion);
        conjunto.push(lsFechasInicio);
        conjunto.push(lsFechasFin);
        conjunto.push(lsTiposSancion);
        conjunto.push(partido);
        this.dialogRef = this.dialog.open(SancionDialog, {
            data: conjunto,
            height: '45%',
            width: '65%',
            disableClose: false,

        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.rojaLocal(result.data);
            }
            this.dialogRef = null;
        });
    }

    openConfirmationDialogVisitante(sancion, lsFechasInicio, lsFechasFin, lsTiposSancion, partido) {
        var conjunto = Array<any>();
        conjunto.push(sancion);
        conjunto.push(lsFechasInicio);
        conjunto.push(lsFechasFin);
        conjunto.push(lsTiposSancion);
        conjunto.push(partido);
        this.dialogRefV = this.dialog.open(SancionDialogV, {
            data: conjunto,
            height: '45%',
            width: '65%',
            disableClose: false,

        });

        this.dialogRefV.afterClosed().subscribe(result => {
            if (result) {
                this.rojaVisistante(result.data);
            }
            this.dialogRefV = null;
        });
    }

    fechasPorZonaLocal(partido: IPartido) {
        this.fixtureService.obtenerFechas(this.zona.id_zona, this.id_torneo).subscribe(
            data => {
                let sancion = new Sancion();
                this.lsFechasFin = [];
                this.lsFechasInicio = [];
                this.fixture = data;
                this.lsFechasInicio = this.fixture.fechas;
                this.lsFechasFin = this.fixture.fechas;
                sancion.equipo.id_equipo = partido.local[0].id_equipo;
                sancion.jugador = this.jugadorLocal;
                sancion.partido.id_partido = partido.id_partido;

                this.openConfirmationDialogLocal(sancion, this.lsFechasInicio, this.lsFechasFin, this.lsTiposSanciones, partido);

            }, error => {
                this.lsFechasFin = [];
                this.lsFechasInicio = [];

            }

        );
    }

    fechasPorZonaVisitante(partido: IPartido) {
        this.fixtureService.obtenerFechas(this.zona.id_zona, this.id_torneo).subscribe(
            data => {
                let sancion = new Sancion();
                this.lsFechasFin = [];
                this.lsFechasInicio = [];
                this.fixture = data;
                this.lsFechasInicio = this.fixture.fechas;
                this.lsFechasFin = this.fixture.fechas;
                sancion.equipo.id_equipo = partido.local[0].id_equipo;
                sancion.jugador = this.jugadorLocal;
                sancion.partido.id_partido = partido.id_partido;

                this.openConfirmationDialogVisitante(sancion, this.lsFechasInicio, this.lsFechasFin, this.lsTiposSanciones, partido);

            }, error => {
                this.lsFechasFin = [];
                this.lsFechasInicio = [];

            }

        );
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

                }
            },
            error => {
                this.toastr.error("Intente nuevamente más tarde.", "Error!");
            }
        )
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
        this.router.navigate(['home/resultado-carga']);
    }

    routeModificacion() {

    }
}