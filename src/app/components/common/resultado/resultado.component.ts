import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';
import { ParserService } from '../../../services/common-services/index';
import {
    Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
    Turno, IEquipo, IPartido, Partido, Jugador, Gol, Resultado
} from '../../../entities/index';
import { EquipoService, ZonaService, HorarioService, CanchaService, FixtureService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialog } from '../../common/dialog/index';



@Component({
    selector: 'resultado',
    moduleId: module.id,
    templateUrl: './resultado.component.html',
    styleUrls: ['./resultado.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class ResultadoComponent implements OnInit {

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

    lsGolesLocal = new Array<Gol>();
    lsGolesVisitante = new Array<Gol>();

    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager,
        public horarioService: HorarioService, public canchaService: CanchaService, public parserService: ParserService,
        public fixtureService: FixtureService, public dialog: MatDialog) {
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

        this.partidos = [];
        this.fixtureService.obtenerPartidos(this.fecha, this.zona.id_zona, this.id_torneo).subscribe(
            data => {
                this.partidos = data;

                for (var i = 0; i < this.partidos.length; i++) {

                    if (this.partidos[i].local) {
                        this.obtenerJugadoresLocal(this.partidos[i]);
                    }
                    if (this.partidos[i].visitante) {
                        this.obtenerJugadoresVisitante(this.partidos[i]);
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
        this.lsGolesLocal.push(gol);
    }

    golVisitante(partido: IPartido) {
        let gol = new Gol();
        gol.equipo.id_equipo = partido.visitante[0].id_equipo;
        gol.jugador = this.jugadorVisitante;
        gol.partido.id_partido = partido.id_partido;
        this.lsGolesVisitante.push(gol);
    }

    registrarResultado() {

        var lsPartidos = new Array<Partido>();
        lsPartidos = this.parserService.parseResultados(this.partidos);
        var localContador = 0;
        var visitanteContador = 0;

        for (let i = 0; i < lsPartidos.length; i++) {

            if (this.lsGolesLocal.find(x => x.partido.id_partido ==
                lsPartidos[i].id_partido) == undefined
                && this.lsGolesVisitante.find(x => x.partido.id_partido ==
                    lsPartidos[i].id_partido) == undefined) {
                /*Si no encuentra ningun jugador dentro de ambas listas para ese id
                partido, significa q empataron*/
                lsPartidos[i].resultado.ganador.id_equipo = lsPartidos[i].local.id_equipo;
                lsPartidos[i].resultado.perdedor.id_equipo = lsPartidos[i].visitante.id_equipo;
                lsPartidos[i].resultado.empate = 1;
            } else if (this.lsGolesLocal.find(x => x.partido.id_partido ==
                lsPartidos[i].id_partido) == undefined
                && this.lsGolesVisitante.find(x => x.partido.id_partido ==
                    lsPartidos[i].id_partido) != undefined) {
                /*Esto significa que local no esta definido por lo tanto no hizo goles
                con lo cual gano si o si el visitante*/
                lsPartidos[i].resultado.ganador.id_equipo = lsPartidos[i].visitante.id_equipo;
                lsPartidos[i].resultado.perdedor.id_equipo = lsPartidos[i].local.id_equipo;

                for (let u = 0; u < this.lsGolesVisitante.length; u++) {
                    if (this.lsGolesVisitante[u].partido.id_partido == lsPartidos[i].id_partido) {
                        lsPartidos[i].lsGoleadoresVisitantes.push(this.lsGolesVisitante[u]);
                    }
                }

            } else if (this.lsGolesLocal.find(x => x.partido.id_partido ==
                lsPartidos[i].id_partido) != undefined
                && this.lsGolesVisitante.find(x => x.partido.id_partido ==
                    lsPartidos[i].id_partido) == undefined) {
                /*Esto significa que visitante no esta definido por lo tanto no hizo goles
               con lo cual gano si o si el local*/
                lsPartidos[i].resultado.ganador.id_equipo = lsPartidos[i].local.id_equipo;
                lsPartidos[i].resultado.perdedor.id_equipo = lsPartidos[i].visitante.id_equipo;
                for (let k = 0; k < this.lsGolesLocal.length; k++) {
                    if (this.lsGolesLocal[k].partido.id_partido == lsPartidos[i].id_partido) {
                        lsPartidos[i].lsGoleadoresLocales.push(this.lsGolesLocal[k]);
                    }
                }

            } else {
                /* Esta es la logica si ambas listas estan definidas para ese partido
                lo que significa que hay que empezar a acumular goles y ver quien gano*/

                for (let j = 0; j < this.lsGolesLocal.length; j++) {
                    if (lsPartidos[i].id_partido == this.lsGolesLocal[j].partido.id_partido) {
                        localContador = localContador + 1;
                        lsPartidos[i].lsGoleadoresLocales.push(this.lsGolesLocal[j]);
                    }
                }
                for (let h = 0; h < this.lsGolesVisitante.length; h++) {
                    if (lsPartidos[i].visitante.id_equipo == this.lsGolesVisitante[h].jugador.equipo.id_equipo) {
                        visitanteContador = visitanteContador + 1;
                        lsPartidos[i].lsGoleadoresVisitantes.push(this.lsGolesVisitante[h]);
                    }

                }
            }
            if (localContador != visitanteContador) {
                if (localContador > visitanteContador) {
                    lsPartidos[i].resultado.ganador.id_equipo = lsPartidos[i].local.id_equipo;
                    lsPartidos[i].resultado.perdedor.id_equipo = lsPartidos[i].visitante.id_equipo;
                } else {
                    lsPartidos[i].resultado.ganador.id_equipo = lsPartidos[i].visitante.id_equipo;
                    lsPartidos[i].resultado.perdedor.id_equipo = lsPartidos[i].local.id_equipo;
                }
            } else {
                lsPartidos[i].resultado.ganador.id_equipo = lsPartidos[i].local.id_equipo;
                lsPartidos[i].resultado.perdedor.id_equipo = lsPartidos[i].visitante.id_equipo;
                lsPartidos[i].resultado.empate = 1;
            }


            localContador = 0;
            visitanteContador = 0;
        }

        this.lsGolesLocal = [];
        this.lsGolesVisitante = [];
        lsPartidos = [];

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
                partido.fecha = this.fecha.fecha;
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
        var lsPartidos = new Array<Partido>();
        lsPartidos = this.parserService.parsePartidos(this.partidos, this.fecha);
        this.fixtureService.update(lsPartidos, this.zona.id_zona, this.id_torneo).subscribe(
            data => {
                this.toastr.success('Se actualizo correctamente la fecha.', "Exito!");
                this.limpiarCampos();
            }, error => {
                this.toastr.error('Intente nuevamente más tarde.', "Error!");

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
        this.router.navigate(['home/resultado-carga']);
    }

    routeModificacion() {

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
}