
import { IEquipo, Torneo, Jugador, Equipo } from './index';

export class Goleador {
    public id_goleador: number;
    public cantidad_goles: number;
    public torneo: Torneo;
    public equipo: IEquipo;
    public jugador: Jugador;

    constructor(
        id_goleador?: number,
        cantidad_goles?: number,
        torneo?: Torneo,
        equipo?: IEquipo,
        jugador?: Jugador
    ) {
        if (id_goleador) this.id_goleador = id_goleador;
        else this.id_goleador = null;

        if (cantidad_goles) this.cantidad_goles = cantidad_goles;
        else this.cantidad_goles = null;

        if (torneo) this.torneo = torneo;
        else this.torneo = new Torneo();

        if (equipo) this.equipo = equipo;
        else this.equipo = new IEquipo();

        if (jugador) this.jugador = jugador;
        else this.jugador = new Jugador();
    }
}
