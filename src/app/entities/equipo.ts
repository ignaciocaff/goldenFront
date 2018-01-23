    import {
        TipoTorneo,
        Categoria,
        Club,
        Torneo
    } from './index';

    export class Equipo {
        public id_equipo: number;
        public nombre: string;
        public descripcion: string;
        public fecha_alta: Date;
        public logo: File;
        public categoria: Categoria;
        public club: Club;
        public torneo: Torneo;

        constructor(
            id_equipo?: number,
            nombre?: string,
            descripcion?: string,
            fecha_alta?: Date,
            logo?: File,
            categoria?: Categoria,
            club?: Club,
            torneo?: Torneo

        ) {
            if (id_equipo) {
                this.id_equipo = id_equipo;
            } else {
                this.id_equipo = null;
            }

            if (nombre) {
                this.nombre = nombre;
            } else {
                this.nombre = null;
            }

            if (descripcion) {
                this.descripcion = descripcion;
            } else {
                this.descripcion = null;
            }

            if (fecha_alta) {
                this.fecha_alta = fecha_alta;
            } else {
                this.fecha_alta = null;
            }

            if (logo) {
                this.logo = logo;
            } else {
                this.logo = null;
            }

            if (categoria) {
                this.categoria = categoria;
            } else {
                this.categoria = new Categoria();
            }

            if (club) {
                this.club = club;
            } else {
                this.club = new Club();
            }

            if (torneo) {
                this.torneo = torneo;
            } else {
                this.torneo = new Torneo();
            }
        }
    }
