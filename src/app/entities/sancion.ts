import {
    Partido, Jugador, TipoSancion, Equipo, Fecha, Zona, Fase
} from './index';

export class Sancion {
    public id_sancion: number;
    public fecha_inicio: Fecha;
    public fecha_fin: Fecha;
    public jugador: Jugador;
    public partido: Partido;
    public equipo: Equipo;
    public detalle: string;
    public tipo_sancion: TipoSancion;
    public zona: Zona
    public fase: Fase

    constructor(
        id_sancion?: number,
        fecha_inicio?: Fecha,
        fecha_fin?: Fecha,
        jugador?: Jugador,
        partido?: Partido,
        detalle?: string,
        equipo?: Equipo,
        tipo_sancion?: TipoSancion,
        zona?: Zona,
        fase?: Fase
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

        if (tipo_sancion) this.tipo_sancion = tipo_sancion;
        else this.tipo_sancion = new TipoSancion();

        if (equipo) this.equipo = equipo;
        else this.equipo = new Equipo();

        if (zona) this.zona = zona;
        else this.zona = new Zona();

        if (fase) this.fase = fase;
        else this.fase = new Fase();
    }
}
