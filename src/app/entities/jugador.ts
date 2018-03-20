import { Equipo, Persona } from './index';

export class Jugador extends Persona {

    public id_jugador: number;
    public numero: number;
    public rol: string;
    public fecha_alta: Date;
    public equipo: Equipo;

    constructor(
        id_jugador?: number,
        numero?: number,
        rol?: string,
        fecha_alta?: Date,
        equipo?: Equipo
    ) {
        super();

        if (id_jugador) {
            this.id_jugador = id_jugador;
        } else {
            this.id_jugador = null;
        }

        if (numero) {
            this.numero = numero;
        } else {
            this.numero = null;
        }

        if (rol) {
            this.rol = rol;
        } else {
            this.rol = null;
        }

        if (fecha_alta) {
            this.fecha_alta = fecha_alta;
        } else {
            this.fecha_alta = null;
        }

        if (equipo) {
            this.equipo = equipo;
        } else {
            this.equipo = new Equipo();
        }
    }
}
