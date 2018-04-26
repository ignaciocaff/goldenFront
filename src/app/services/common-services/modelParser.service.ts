import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { IEquipo, IPartido, Equipo, Partido, Fecha, Gol, Sancion } from '../../entities/index';

@Injectable()
export class ParserService {
    constructor() { }

    parsePartidos(partidos: Array<IPartido>, fecha: Fecha) {
        let lsPartidos = new Array<Partido>();
        for (let i = 0; i < partidos.length; i++) {
            var partido = new Partido();
            var local = new Equipo();
            var visitante = new Equipo();

            partido.horario_fijo = partidos[i].horario;
            partido.cancha = partidos[i].cancha;
            partido.fecha.fecha = fecha.fecha;
            partido.fecha.id_fecha = fecha.id_fecha;
            partido.estado.id_estado = 1;
            if (partidos[i].id_partido > 0) {
                partido.id_partido = partidos[i].id_partido;
            }

            for (let j = 0; j < partidos[i].local.length; j++) {
                local.id_equipo = partidos[i].local[j].id_equipo;
                local.nombre = partidos[i].local[j].nombre;
                partido.local = local;
            }

            for (let f = 0; f < partidos[i].visitante.length; f++) {
                visitante.id_equipo = partidos[i].visitante[f].id_equipo;
                visitante.nombre = partidos[i].visitante[f].nombre;
                partido.visitante = visitante;
            }
            lsPartidos.push(partido);
        }
        return lsPartidos;
    }

    parseInterezonales(partidos: Array<IPartido>, fecha: Fecha) {
        let lsPartidos = new Array<Partido>();
        for (let i = 0; i < partidos.length; i++) {
            var partido = new Partido();
            var local = new Equipo();
            var visitante = new Equipo();

            partido.horario_fijo = partidos[i].horario;
            partido.cancha = partidos[i].cancha;
            partido.fecha.fecha = fecha.fecha;
            partido.fecha.id_fecha = fecha.id_fecha;
            partido.estado.id_estado = 1;
            if (partidos[i].id_partido > 0) {
                partido.id_partido = partidos[i].id_partido;
            }

            for (let j = 0; j < partidos[i].local.length; j++) {
                local.id_equipo = partidos[i].local[j].id_equipo;
                local.nombre = partidos[i].local[j].nombre;
                partido.local = local;
            }

            for (let f = 0; f < partidos[i].visitante.length; f++) {
                visitante.id_equipo = partidos[i].visitante[f].id_equipo;
                visitante.nombre = partidos[i].visitante[f].nombre;
                partido.visitante = visitante;
            }
            lsPartidos.push(partido);
        }
        return lsPartidos;
    }

    parseResultados(partidos: Array<IPartido>, id_torneo: number) {
        let lsPartidos = new Array<Partido>();
        for (let i = 0; i < partidos.length; i++) {
            var partido = new Partido();
            var local = new Equipo();
            var visitante = new Equipo();

            partido.estado.id_estado = 1;
            if (partidos[i].id_partido > 0) {
                partido.id_partido = partidos[i].id_partido;
            }

            if (partidos[i].lsGolesLocal) {
                partido.lsGoleadoresLocales = partidos[i].lsGolesLocal;
            } else {
                partido.lsGoleadoresLocales = new Array<Gol>();
            }

            if (partidos[i].lsGolesVisitante) {
                partido.lsGoleadoresVisitantes = partidos[i].lsGolesVisitante;
            } else {
                partido.lsGoleadoresVisitantes = new Array<Gol>();
            }

            //Sanciones

            if (partidos[i].lsSancionesLocal) {
                partido.lsSancionesLocal = partidos[i].lsSancionesLocal;
            } else {
                partido.lsSancionesLocal = new Array<Sancion>();
            }

            if (partidos[i].lsSancionesVisitante) {
                partido.lsSancionesVisitante = partidos[i].lsSancionesVisitante;
            } else {
                partido.lsSancionesVisitante = new Array<Sancion>();
            }

            for (let j = 0; j < partidos[i].local.length; j++) {
                local.id_equipo = partidos[i].local[j].id_equipo;
                local.nombre = partidos[i].local[j].nombre;
                partido.local = local;
                partido.local.torneo.id_torneo = id_torneo;
            }

            for (let f = 0; f < partidos[i].visitante.length; f++) {
                visitante.id_equipo = partidos[i].visitante[f].id_equipo;
                visitante.nombre = partidos[i].visitante[f].nombre;
                partido.visitante = visitante;
                partido.visitante.torneo.id_torneo = id_torneo;
            }
            partido.llave = partidos[i].llave;
            partido.fecha.id_fecha = partidos[i].fecha.id_fecha;
            partido.fecha.fecha = partidos[i].fecha.fecha;
            lsPartidos.push(partido);
        }
        return lsPartidos;
    }

    parseResultado(partidoI: IPartido, id_torneo: number) {
        let partido = new Partido();

        var local = new Equipo();
        var visitante = new Equipo();

        partido.estado.id_estado = 1;
        if (partidoI.id_partido > 0) {
            partido.id_partido = partidoI.id_partido;
        }

        if (partidoI.lsGolesLocal) {
            partido.lsGoleadoresLocales = partidoI.lsGolesLocal;
        } else {
            partido.lsGoleadoresLocales = new Array<Gol>();
        }

        if (partidoI.lsGolesVisitante) {
            partido.lsGoleadoresVisitantes = partidoI.lsGolesVisitante;
        } else {
            partido.lsGoleadoresVisitantes = new Array<Gol>();
        }

        //Sanciones

        if (partidoI.lsSancionesLocal) {
            partido.lsSancionesLocal = partidoI.lsSancionesLocal;
        } else {
            partido.lsSancionesLocal = new Array<Sancion>();
        }

        if (partidoI.lsSancionesVisitante) {
            partido.lsSancionesVisitante = partidoI.lsSancionesVisitante;
        } else {
            partido.lsSancionesVisitante = new Array<Sancion>();
        }

        for (let j = 0; j < partidoI.local.length; j++) {
            local.id_equipo = partidoI.local[j].id_equipo;
            local.nombre = partidoI.local[j].nombre;
            partido.local = local;
            partido.local.torneo.id_torneo = id_torneo;
        }

        for (let f = 0; f < partidoI.visitante.length; f++) {
            visitante.id_equipo = partidoI.visitante[f].id_equipo;
            visitante.nombre = partidoI.visitante[f].nombre;
            partido.visitante = visitante;
            partido.visitante.torneo.id_torneo = id_torneo;
        }
        partido.llave = partidoI.llave;

        return partido;
    }
}