import {
    Domicilio,
    Club
} from './index';

export class Cancha {
    public id_cancha: number;
    public nombre: string;
    public capacidad: number;
    public domicilio: Domicilio;
    public club: Club;
    constructor(
        id_cancha?: number,
        nombre?: string,
        capacidad?: number,
        domicilio?: Domicilio,
        club?: Club
    ) {
        if (id_cancha) this.id_cancha = id_cancha;
        else this.id_cancha = null;

        if (nombre) this.nombre = nombre;
        else this.nombre = null;

        if (capacidad) this.capacidad = capacidad;
        else this.capacidad = null;

        if (domicilio) this.domicilio = domicilio;
        else this.domicilio = new Domicilio();

        if (club) this.club = club;
        else this.club = new Club();
    }
}
