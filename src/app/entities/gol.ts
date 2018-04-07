import {
    Equipo, Partido, Jugador
} from './index';

export class Gol {
    public id_gol: number;
    public minuto: Date;
    public jugador: Jugador;
    public partido: Partido;
    public equipo: Equipo;

    constructor(
        id_gol?: number,
        minuto?: Date,
        jugador?: Jugador,
        partido?: Partido,
        equipo?: Equipo
    ) {
        if (id_gol) this.id_gol = id_gol;
        else this.id_gol = null;

        if (minuto) this.minuto = minuto;
        else this.minuto = null;

        if (jugador) this.jugador = jugador;
        else this.jugador = new Jugador();

        if (partido) this.partido = partido;
        else this.partido = new Partido();

        if (equipo) this.equipo = equipo;
        else this.equipo = new Equipo();
    }
}
