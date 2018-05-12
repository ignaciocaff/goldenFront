import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../../services/entity-services/file.service';
import { ParserService } from '../../../../services/common-services/index';
import {
    Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
    Turno, IEquipo, IPartido, Partido, Jugador, Gol, ResultadoZona, Sancion, TipoSancion
} from '../../../../entities/index';
import { EquipoService, ZonaService, HorarioService, CanchaService, FixtureService, SancionService, PartidoService } from '../../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { SancionDialog, SancionDialogV } from '.././index';
import { ConfirmationDialog } from '../../../common/dialog/index';
import { AppConfig } from '../../../../app.config';

@Component({
    selector: 'resultado-update',
    moduleId: module.id,
    templateUrl: './resultado-update.component.html',
    styleUrls: ['./resultado-update.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class ResultadoUpdateComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    dialogRef: MatDialogRef<SancionDialog>;
    dialogRefV: MatDialogRef<SancionDialogV>;
    dialogRefBorrado: MatDialogRef<ConfirmationDialog>;
    displayedColumns = ['apellido', 'nombre', 'id_sancion'];
    displayedColumnsG = ['apellido', 'gol', 'id_gol'];

    lsTiposSanciones = new Array<TipoSancion>();
    lsCanchas = new Array<Cancha>();
    horarios = new Array<HorarioFijo>();
    lsZonas = new Array<Zona>();
    lsEquipos = new Array<Equipo>();
    id_torneo: number;
    id_fase: number;
    fecha: Fecha = new Fecha();
    zona: Zona = new Zona();
    equipo: Equipo = new Equipo();
    partido: IPartido;
    jugadorVisitante = new Jugador();
    jugadorLocal = new Jugador();
    fixture = new Fixture();
    lsFechasInicio = new Array<Fecha>();
    lsFechasFin = new Array<Fecha>();
    partidos = new Array<IPartido>();
    dataSourceSLocal = new MatTableDataSource<Sancion>();
    dataSourceSVisitante = new MatTableDataSource<Sancion>();
    dataSourceGLocal = new MatTableDataSource<Gol>();
    dataSourceGVisitante = new MatTableDataSource<Gol>();
    esInterzonal: number = 0;
    checked: boolean;
    evento: boolean;

    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager,
        public horarioService: HorarioService, public canchaService: CanchaService, public parserService: ParserService,
        public fixtureService: FixtureService, public dialog: MatDialog,
        public sancionService: SancionService, public partidoService: PartidoService,
        public config: AppConfig) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.id_fase = Number(sessionStorage.getItem('fase'));

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
            this.equipo = null;
            this.obtenerEquiposTodos();
        } else {
            this.esInterzonal = 0;
            this.zona = null;
            this.equipo = null;
        }
        this.obtenerPartido();

    }

    obtenerEquipos(zona: Zona) {
        if (!zona.id_zona) {
            this.lsEquipos = [];
        }
        this.equipoService.getAllPorZona(zona.id_zona).subscribe(
            data => {
                this.lsEquipos = [];
                for (let i = 0; i < data.length; i++) {
                    var equipo = new Equipo();
                    equipo = data[i];
                    this.lsEquipos.push(equipo);
                }
            }, error => {
                error.json()['Message'];
            }
        );
    }


    obtenerEquiposTodos() {
        return this.equipoService.getAllPorTorneo(this.id_torneo).subscribe(
            data => {
                this.lsEquipos = [];
                for (let i = 0; i < data.length; i++) {
                    var equipo = new Equipo();
                    equipo = data[i];
                    this.lsEquipos.push(equipo);
                }
            }, error => {
                error.json()['Message'];
            }
        );
    }

    obtenerPartido() {
        this.fixtureService.obtenerPartidoFZEquipo(this.fecha, this.equipo == null ? 0 : this.equipo.id_equipo, this.id_torneo, this.zona == null ? 0 : this.zona.id_zona, this.esInterzonal).subscribe(
            data => {
                if (data) {
                    this.partido = data;
                    this.dataSourceSLocal = new MatTableDataSource(this.partido.lsSancionesLocal);
                    this.dataSourceSVisitante = new MatTableDataSource(this.partido.lsSancionesVisitante);
                    this.dataSourceGLocal = new MatTableDataSource(this.partido.lsGolesLocal);
                    this.dataSourceGVisitante = new MatTableDataSource(this.partido.lsGolesVisitante);
                    this.partido.desImagenes = true;
                    this.partido.desImagenesV = true;
                    this.partido.jugadorVisitante = new Jugador();
                    this.partido.jugadorLocal = new Jugador();
                    this.partido.jugadorVisitante.acumAmarillas = 0;
                    this.partido.jugadorVisitante.acumRojas = 0;
                }

            }, error => {
                error.json()['Message'];
                this.partido = null;
            }
        );
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
        this.partido.lsSancionesLocal.push(sancion);
        this.dataSourceSLocal = new MatTableDataSource(this.partido.lsSancionesLocal);
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
        this.partido.lsSancionesVisitante.push(sancion);
        this.dataSourceSVisitante = new MatTableDataSource(this.partido.lsSancionesVisitante);
    }

    onChangeLocal(jugador: Jugador, partido: IPartido) {
        if (jugador.apellido != null) {
            partido.desImagenes = false;
        } else {
            partido.desImagenes = true;
            this.partido.jugadorLocal.acumAmarillas = 0;
            this.partido.jugadorLocal.acumRojas = 0;
        }

        this.sancionService.getAcumuladoTarjetas(this.id_torneo, jugador.id_jugador)
            .subscribe(
                data => {
                    var sanciones = new Array<Sancion>();
                    sanciones = data;
                    this.calcularRojasAmarillasL(jugador, sanciones);
                },
                error => {

                });
    }
    onChangeVisitante(jugador: Jugador, partido: IPartido) {
        if (jugador.apellido != null) {
            partido.desImagenesV = false;
        } else {
            partido.desImagenesV = true;
            this.partido.jugadorVisitante.acumAmarillas = 0;
            this.partido.jugadorVisitante.acumRojas = 0;
        }

        this.sancionService.getAcumuladoTarjetas(this.id_torneo, jugador.id_jugador)
            .subscribe(
                data => {
                    var sanciones = new Array<Sancion>();
                    sanciones = data;
                    this.calcularRojasAmarillasV(jugador, sanciones);
                },
                error => {

                });
    }

    calcularRojasAmarillasL(jugador: Jugador, sanciones: Array<Sancion>) {
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
        this.partido.jugadorLocal = jugador;
    }

    calcularRojasAmarillasV(jugador: Jugador, sanciones: Array<Sancion>) {
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
        this.partido.jugadorVisitante = jugador;
    }

    golLocal(partido: IPartido) {
        let gol = new Gol();
        gol.equipo.id_equipo = partido.local[0].id_equipo;
        gol.jugador = this.jugadorLocal;
        gol.partido.id_partido = partido.id_partido;
        this.partido.lsGolesLocal.push(gol);
        this.dataSourceGLocal = new MatTableDataSource(this.partido.lsGolesLocal);
    }

    golVisitante(partido: IPartido) {
        let gol = new Gol();
        gol.equipo.id_equipo = partido.visitante[0].id_equipo;
        gol.jugador = this.jugadorVisitante;
        gol.partido.id_partido = partido.id_partido;
        // this.lsGolesVisitante.push(gol);
        this.partido.lsGolesVisitante.push(gol);
        this.dataSourceGVisitante = new MatTableDataSource(this.partido.lsGolesVisitante);
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
                this.dataSourceSLocal = new MatTableDataSource(this.partido.lsSancionesLocal);
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
                this.dataSourceSVisitante = new MatTableDataSource(this.partido.lsSancionesVisitante);
            }
            this.dialogRefV = null;
        });
    }

    eliminarSancion(id_sancion: number) {
        this.dialogRefBorrado = this.dialog.open(ConfirmationDialog, {
            height: '200px',
            width: '350px',
            disableClose: false
        });
        this.dialogRefBorrado.componentInstance.confirmMessage = "Se eliminara la sanción al jugador."

        this.dialogRefBorrado.afterClosed().subscribe(result => {
            if (result) {

                for (let i = 0; i < this.partido.lsSancionesLocal.length; i++) {
                    if (id_sancion == this.partido.lsSancionesLocal[i]['id_sancion']) {
                        const index = this.partido.lsSancionesLocal.findIndex((sancion: Sancion) => {
                            return sancion.id_sancion == id_sancion;
                        });
                        if (index !== -1) {
                            this.partido.lsSancionesLocal.splice(index, 1);
                            this.dataSourceSLocal = new MatTableDataSource(this.partido.lsSancionesLocal);
                        }
                    }
                }

                for (let i = 0; i < this.partido.lsSancionesVisitante.length; i++) {
                    if (id_sancion == this.partido.lsSancionesVisitante[i]['id_sancion']) {
                        const index = this.partido.lsSancionesVisitante.findIndex((sancion: Sancion) => {
                            return sancion.id_sancion == id_sancion;
                        });
                        if (index !== -1) {
                            this.partido.lsSancionesVisitante.splice(index, 1);
                            this.dataSourceSVisitante = new MatTableDataSource(this.partido.lsSancionesVisitante);
                        }
                    }
                }

                this.partidoService.borrarSancion(id_sancion).subscribe(
                    data => {
                        this.toastr.success("La sanción fue eliminada correctamente.", "Éxito!");
                    }, error => {

                    }
                );
            }
            this.dialogRefBorrado = null;
        });
    }

    eliminarGol(id_gol: number) {
        this.dialogRefBorrado = this.dialog.open(ConfirmationDialog, {
            height: '200px',
            width: '350px',
            disableClose: false
        });
        this.dialogRefBorrado.componentInstance.confirmMessage = "Se eliminara el gol al jugador."

        this.dialogRefBorrado.afterClosed().subscribe(result => {
            if (result) {
                for (let i = 0; i < this.partido.lsGolesLocal.length; i++) {
                    if (id_gol == this.partido.lsGolesLocal[i]['id_gol']) {
                        const index = this.partido.lsGolesLocal.findIndex((gol: Gol) => {
                            return gol.id_gol == id_gol;
                        });
                        if (index !== -1) {
                            this.partido.lsGolesLocal.splice(index, 1);
                            this.dataSourceGLocal = new MatTableDataSource(this.partido.lsGolesLocal);
                        }
                    }
                }

                for (let i = 0; i < this.partido.lsGolesVisitante.length; i++) {
                    if (id_gol == this.partido.lsGolesVisitante[i]['id_gol']) {
                        const index = this.partido.lsGolesVisitante.findIndex((gol: Gol) => {
                            return gol.id_gol == id_gol;
                        });
                        if (index !== -1) {
                            this.partido.lsGolesVisitante.splice(index, 1);
                            this.dataSourceGVisitante = new MatTableDataSource(this.partido.lsGolesVisitante);
                        }
                    }
                }

                this.partidoService.borrarGol(id_gol, this.id_fase, this.zona == null ? 0 : this.zona.id_zona).subscribe(
                    data => {
                        this.toastr.success("El gol fue eliminado correctamente.", "Éxito!");
                    }, error => {

                    }
                );
            }
            this.dialogRefBorrado = null;
        });
    }


    modificarResultado() {
        var partido = new Partido();
        if (this.partido) {
            partido = this.parserService.parseResultado(this.partido, this.id_torneo);
        }

        if (this.esInterzonal == 1) {
            if (partido.lsGoleadoresLocales.length ==
                partido.lsGoleadoresVisitantes.length) {
                partido.resultado.ganador.id_equipo = partido.local.id_equipo;
                partido.resultado.perdedor.id_equipo = partido.visitante.id_equipo;
                partido.resultado.empate = 1;
            } else if (partido.lsGoleadoresLocales.length
                > partido.lsGoleadoresVisitantes.length) {
                partido.resultado.ganador.id_equipo = partido.local.id_equipo;
                partido.resultado.perdedor.id_equipo = partido.visitante.id_equipo;
            } else {
                partido.resultado.ganador.id_equipo = partido.visitante.id_equipo;
                partido.resultado.perdedor.id_equipo = partido.local.id_equipo;
            }
        } else {
            partido.resultado_zona.zona = this.zona;
            if (partido.lsGoleadoresLocales.length ==
                partido.lsGoleadoresVisitantes.length) {
                partido.resultado_zona.ganador.id_equipo = partido.local.id_equipo;
                partido.resultado_zona.perdedor.id_equipo = partido.visitante.id_equipo;
                partido.resultado_zona.empate = 1;
            } else if (partido.lsGoleadoresLocales.length
                > partido.lsGoleadoresVisitantes.length) {
                partido.resultado_zona.ganador.id_equipo = partido.local.id_equipo;
                partido.resultado_zona.perdedor.id_equipo = partido.visitante.id_equipo;
            } else {
                partido.resultado_zona.ganador.id_equipo = partido.visitante.id_equipo;
                partido.resultado_zona.perdedor.id_equipo = partido.local.id_equipo;
            }
        }

        this.partidoService.update(partido, this.id_fase, this.id_torneo, this.esInterzonal).subscribe(
            data => {
                if (data) {
                    this.toastr.success("Se modificaron correctamente los resultados.", "Éxito!");
                    this.limpiarCampos();
                }
            }, error => {
                this.toastr.error("Intente nuevamente más tarde.", "Error!");
            }

        );
    }

    limpiarCampos() {
        this.partido = null;
        this.zona = null;
        this.equipo = null;
        this.ngOnInit();
    }

    routeAlta() {
        this.router.navigate(['home/resultado-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/resultado-update']);
    }
}