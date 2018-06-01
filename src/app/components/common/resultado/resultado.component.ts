import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';
import { ParserService } from '../../../services/common-services/index';
import {
    Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
    Turno, IEquipo, IPartido, Partido, Jugador, Gol, ResultadoZona, Sancion, TipoSancion
} from '../../../entities/index';
import { EquipoService, ZonaService, HorarioService, CanchaService, FixtureService, SancionService, PartidoService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialog } from '../../common/dialog/index';
import { SancionDialog, SancionDialogV } from './index';
import { AppConfig } from '../../../app.config';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
    JugadorLocalActual = new Jugador();

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
    id_fase: number;
    esInterzonal: number = 0;
    checked: boolean;
    evento: boolean;
    deshabilitarImagenes: boolean;
    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager,
        public horarioService: HorarioService, public canchaService: CanchaService, public parserService: ParserService,
        public fixtureService: FixtureService, public dialog: MatDialog,
        public sancionService: SancionService, public partidoService: PartidoService,
        public config: AppConfig,
        private spinnerService: Ng4LoadingSpinnerService
    ) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.id_fase = Number(sessionStorage.getItem('fase'));

    }
    ngOnInit() {
        this.deshabilitarImagenes = true;
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
                    if (tipoSancion.id_tipo != 1) {
                        this.lsTiposSanciones.push(tipoSancion);
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

    checkValue(event: any) {
        this.evento = event;
        if (event) {
            this.esInterzonal = 1;
            this.zona = null;
        } else {
            this.esInterzonal = 0;
        }
        this.obtenerPartidosImplementacion();

    }

    public obtenerPartidosImplementacion() {
        this.partidos = [];
        this.fixtureService.obtenerPartidos(this.fecha, this.id_torneo, this.zona == null ? 0 : this.zona.id_zona, this.esInterzonal).subscribe(
            data => {
                this.partidos = data;
                for (var i = 0; i < this.partidos.length; i++) {

                    if (this.partidos[i].local) {
                        this.obtenerJugadoresLocal(this.partidos[i]);
                        this.partidos[i].lsGolesLocal = new Array<Gol>();
                        this.partidos[i].lsSancionesLocal = new Array<Sancion>();
                        this.partidos[i].jugadorLocal = new Jugador();
                        this.partidos[i].jugadorLocal.acumAmarillas = 0;
                        this.partidos[i].jugadorLocal.acumRojas = 0;
                        this.partidos[i].desImagenes = true;
                    }
                    if (this.partidos[i].visitante) {
                        this.obtenerJugadoresVisitante(this.partidos[i]);
                        this.partidos[i].lsGolesVisitante = new Array<Gol>();
                        this.partidos[i].lsSancionesVisitante = new Array<Sancion>();
                        this.partidos[i].jugadorVisitante = new Jugador();
                        this.partidos[i].jugadorVisitante.acumAmarillas = 0;
                        this.partidos[i].jugadorVisitante.acumRojas = 0;
                        this.partidos[i].desImagenesV = true;
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

    onChangeLocal(jugador: Jugador, partido: IPartido) {
        if (jugador.apellido != null) {
            partido.desImagenes = false;
        } else {
            partido.desImagenes = true;
        }

        this.sancionService.getAcumuladoTarjetas(this.id_torneo, jugador.id_jugador)
            .subscribe(
                data => {
                    var sanciones = new Array<Sancion>();
                    sanciones = data;
                    this.calcularRojasAmarillasL(jugador, sanciones, partido);
                },
                error => {

                });
    }
    onChangeVisitante(jugador: Jugador, partido: IPartido) {
        if (jugador.apellido != null) {
            partido.desImagenesV = false;
        } else {
            partido.desImagenesV = true;
        }

        this.sancionService.getAcumuladoTarjetas(this.id_torneo, jugador.id_jugador)
            .subscribe(
                data => {
                    var sanciones = new Array<Sancion>();
                    sanciones = data;
                    this.calcularRojasAmarillasV(jugador, sanciones, partido);
                },
                error => {

                });
    }

    calcularRojasAmarillasL(jugador: Jugador, sanciones: Array<Sancion>, partido: IPartido) {
        let amarillas = 0;
        let rojas = 0;
        for (var j = 0; j < this.partidos.length; j++) {
            this.partidos[j].jugadorLocal = new Jugador();
        }
        for (var i = 0; i < sanciones.length; i++) {
            if (sanciones[i].tipo_sancion.id_tipo == 1) {
                //Acumulo Amarillas
                amarillas = amarillas + 1;
            }
            if (sanciones[i].tipo_sancion.id_tipo == 2) {
                //Acumulo Rojas - No distingo el resto
                rojas = rojas + 1;
            }
        }

        while (amarillas > 4) {
            amarillas = amarillas - 5;
        }
        jugador.acumAmarillas = amarillas;
        jugador.acumRojas = rojas;
        partido.jugadorLocal = jugador;
    }

    calcularRojasAmarillasV(jugador: Jugador, sanciones: Array<Sancion>, partido: IPartido) {
        let amarillas = 0;
        let rojas = 0;
        for (var i = 0; i < sanciones.length; i++) {
            if (sanciones[i].tipo_sancion.id_tipo == 1) {
                //Acumulo Amarillas
                amarillas = amarillas + 1;
            }
            if (sanciones[i].tipo_sancion.id_tipo == 2) {
                //Acumulo Rojas - No distingo el resto
                rojas = rojas + 1;
            }
        }
        jugador.acumAmarillas = amarillas;
        jugador.acumRojas = rojas;
        partido.jugadorVisitante = jugador;
    }

    golLocal(partido: IPartido) {
        let gol = new Gol();
        gol.equipo.id_equipo = partido.local[0].id_equipo;
        gol.jugador = this.jugadorLocal;
        gol.partido.id_partido = partido.id_partido;
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
        this.spinnerService.show();
        var lsPartidos = new Array<Partido>();
        lsPartidos = this.parserService.parseResultados(this.partidos, this.id_torneo);


        for (let i = 0; i < lsPartidos.length; i++) {

            if (this.esInterzonal == 1) {
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
            } else {
                lsPartidos[i].resultado_zona.zona = this.zona;
                if (lsPartidos[i].lsGoleadoresLocales.length ==
                    lsPartidos[i].lsGoleadoresVisitantes.length) {
                    lsPartidos[i].resultado_zona.ganador.id_equipo = lsPartidos[i].local.id_equipo;
                    lsPartidos[i].resultado_zona.perdedor.id_equipo = lsPartidos[i].visitante.id_equipo;
                    lsPartidos[i].resultado_zona.empate = 1;
                } else if (lsPartidos[i].lsGoleadoresLocales.length
                    > lsPartidos[i].lsGoleadoresVisitantes.length) {
                    lsPartidos[i].resultado_zona.ganador.id_equipo = lsPartidos[i].local.id_equipo;
                    lsPartidos[i].resultado_zona.perdedor.id_equipo = lsPartidos[i].visitante.id_equipo;
                } else {
                    lsPartidos[i].resultado_zona.ganador.id_equipo = lsPartidos[i].visitante.id_equipo;
                    lsPartidos[i].resultado_zona.perdedor.id_equipo = lsPartidos[i].local.id_equipo;
                }
            }
        }

        this.partidoService.create(lsPartidos, this.id_fase, this.id_torneo, this.esInterzonal).subscribe(
            data => {
                if (data) {
                    this.toastr.success("Se registraron correctamente los resultados.", "Éxito!");
                    this.limpiarCampos();
                    this.spinnerService.hide();
                }
            }, error => {
                this.toastr.error("Intente nuevamente más tarde.", "Error!");
                this.spinnerService.hide();
            }

        );
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
        if (this.esInterzonal == 0) {
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
                    sancion.zona.id_zona = this.zona != null ? this.zona.id_zona : null;
                    sancion.fase.id_fase = this.id_fase;

                    this.openConfirmationDialogLocal(sancion, this.lsFechasInicio, this.lsFechasFin, this.lsTiposSanciones, partido);

                }, error => {
                    this.lsFechasFin = [];
                    this.lsFechasInicio = [];

                }

            );
        } else {
            this.fixtureService.obtenerFechasInterzonales(this.id_torneo).subscribe(
                data => {
                    let sancion = new Sancion();
                    this.lsFechasFin = [];
                    this.lsFechasInicio = [];
                    this.lsFechasInicio = data;
                    this.lsFechasFin = data;
                    sancion.equipo.id_equipo = partido.local[0].id_equipo;
                    sancion.jugador = this.jugadorLocal;
                    sancion.partido.id_partido = partido.id_partido;
                    sancion.zona.id_zona = this.zona != null ? this.zona.id_zona : null;
                    sancion.fase.id_fase = this.id_fase;

                    this.openConfirmationDialogLocal(sancion, this.lsFechasInicio, this.lsFechasFin, this.lsTiposSanciones, partido);

                }, error => {
                    this.lsFechasFin = [];
                    this.lsFechasInicio = [];
                }
            );

        }
    }

    amarillaLocal(partido: IPartido) {
        let sancion = new Sancion();
        sancion.equipo.id_equipo = partido.local[0].id_equipo;
        sancion.jugador = this.jugadorLocal;
        sancion.partido.id_partido = partido.id_partido;
        sancion.zona.id_zona = this.zona != null ? this.zona.id_zona : null;
        sancion.tipo_sancion.id_tipo = 1;
        sancion.fecha_inicio.fecha = this.fecha.fecha;
        sancion.fecha_fin.fecha = this.fecha.fecha;
        sancion.tipo_sancion.descripcion = 'Amarilla';
        sancion.fase.id_fase = this.id_fase;
        partido.lsSancionesLocal.push(sancion);
    }

    amarillaVisitante(partido: IPartido) {
        let sancion = new Sancion();
        sancion.equipo.id_equipo = partido.visitante[0].id_equipo;
        sancion.jugador = this.jugadorVisitante;
        sancion.partido.id_partido = partido.id_partido;
        sancion.zona.id_zona = this.zona != null ? this.zona.id_zona : null;
        sancion.tipo_sancion.id_tipo = 1;
        sancion.tipo_sancion.descripcion = 'Amarilla';
        sancion.fecha_inicio.fecha = this.fecha.fecha;
        sancion.fecha_fin.fecha = this.fecha.fecha;
        sancion.fase.id_fase = this.id_fase;
        partido.lsSancionesVisitante.push(sancion);

    }

    fechasPorZonaVisitante(partido: IPartido) {
        if (this.esInterzonal == 0) {
            this.fixtureService.obtenerFechas(this.zona.id_zona, this.id_torneo).subscribe(
                data => {
                    let sancion = new Sancion();
                    this.lsFechasFin = [];
                    this.lsFechasInicio = [];
                    this.fixture = data;
                    this.lsFechasInicio = this.fixture.fechas;
                    this.lsFechasFin = this.fixture.fechas;
                    sancion.equipo.id_equipo = partido.visitante[0].id_equipo;
                    sancion.jugador = this.jugadorVisitante;
                    sancion.partido.id_partido = partido.id_partido;
                    sancion.zona.id_zona = this.zona != null ? this.zona.id_zona : null;
                    sancion.fase.id_fase = this.id_fase;


                    this.openConfirmationDialogVisitante(sancion, this.lsFechasInicio, this.lsFechasFin, this.lsTiposSanciones, partido);

                }, error => {
                    this.lsFechasFin = [];
                    this.lsFechasInicio = [];

                }

            );
        } else {
            this.fixtureService.obtenerFechasInterzonales(this.id_torneo).subscribe(
                data => {
                    let sancion = new Sancion();
                    this.lsFechasFin = [];
                    this.lsFechasInicio = [];
                    this.lsFechasInicio = data;
                    this.lsFechasFin = data;
                    sancion.equipo.id_equipo = partido.visitante[0].id_equipo;
                    sancion.jugador = this.jugadorVisitante;
                    sancion.partido.id_partido = partido.id_partido;
                    sancion.zona.id_zona = this.zona != null ? this.zona.id_zona : null;
                    sancion.fase.id_fase = this.id_fase;


                    this.openConfirmationDialogVisitante(sancion, this.lsFechasInicio, this.lsFechasFin, this.lsTiposSanciones, partido);

                }, error => {
                    this.lsFechasFin = [];
                    this.lsFechasInicio = [];

                }

            );
        }
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
        this.partidos = [];
        this.cantidadPartidos = null;
        this.equipos = [];
        this.zona = null
        this.ngOnInit();
    }

    limpiarComp() {
    }


    routeAlta() {
        this.router.navigate(['home/resultado-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/resultado-update']);
    }
}