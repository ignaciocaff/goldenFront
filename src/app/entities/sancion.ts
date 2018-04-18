import {
    Partido, Jugador, TipoSancion, Equipo, Fecha
} from './index';

export class Sancion {
    public id_sancion: number;
    public fecha_inicio: Fecha;
    public fecha_fin: Fecha;
    public jugador: Jugador;
    public partido: Partido;
    public equipo: Equipo;
    public detalle: string;
    public tipo: TipoSancion;

    constructor(
        id_sancion?: number,
        fecha_inicio?: Fecha,
        fecha_fin?: Fecha,
        jugador?: Jugador,
        partido?: Partido,
        detalle?: string,
        equipo?: Equipo,
        tipo?: TipoSancion,
    ) {
        if (id_sancion) this.id_sancion = id_sancion;
        else this.id_sancion = null;

        if (fecha_inicio) this.fecha_inicio = fecha_inicio;
        else this.fecha_inicio = new Fecha();

        if (fecha_fin) this.fecha_fin = fecha_fin;
        else this.fecha_fin = new Fecha();

        if (jugador) this.jugador = jugador;
        else this.jugador = new Jugador();

        if (partido) this.partido = partido;
        else this.partido = new Partido();

        if (detalle) this.detalle = detalle;
        else this.detalle = null;

        if (tipo) this.tipo = tipo;
        else this.tipo = new TipoSancion();

        if (equipo) this.equipo = equipo;
        else this.equipo = new Equipo();
    }
}
