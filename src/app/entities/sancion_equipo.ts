import { Equipo, Zona, Torneo } from './index'
export class SancionEquipo {
    public id_sancion_equipo: number;
    public descripcion: string;
    public puntos_restados: number;
    public equipo: Equipo;
    public zona: Zona;
    public torneo: Torneo;

    constructor(
        id_sancion_equipo?: number,
        descripcion?: string,
        puntos_restados?: number,
        equipo?: Equipo,
        zona?: Zona,
        torneo?: Torneo
    ) {
        if (id_sancion_equipo) this.id_sancion_equipo = id_sancion_equipo;
        else this.id_sancion_equipo = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (puntos_restados) this.puntos_restados = puntos_restados;
        else this.puntos_restados = null;

        if (equipo) this.equipo = equipo;
        else this.equipo = new Equipo();

        if (zona) this.zona = zona;
        else this.zona = new Zona();

        if (torneo) this.torneo = torneo;
        else this.torneo = new Torneo();
    }
}
