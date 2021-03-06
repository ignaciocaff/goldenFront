import { Jugador } from './index';
export class IEquipo {
    nombre: string;
    id_equipo: number;
    imagePath: string;
    logo: number;
    lsJugadores: Array<Jugador>;

    constructor(
        nombre?: string,
        id_equipo?: number,
        imagePath?: string,
        logo?: number,
        lsJugadores?: Array<Jugador>
    ) {
        if (nombre) this.nombre = nombre;
        else this.nombre = null;

        if (id_equipo) this.id_equipo = id_equipo;
        else this.id_equipo = null;

        if (imagePath) this.imagePath = imagePath;
        else this.imagePath = null;

        if (logo) this.logo = logo;
        else this.logo = null;

        if (lsJugadores) this.lsJugadores = lsJugadores;
        else this.lsJugadores = new Array<Jugador>();
    }
}