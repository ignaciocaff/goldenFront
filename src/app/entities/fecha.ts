
import { EstadoFecha, Partido, Fixture } from './index';

export class Fecha {
    public id_fecha: number;
    public fecha: Date;
    public estado: EstadoFecha;
    public partidos: Array<Partido>;
    public fixture: Fixture;
    constructor(
        id_fecha?: number,
        fecha?: Date,
        estado?: EstadoFecha,
        partidos?: Array<Partido>,
        fixture?: Fixture
    ) {

        if (id_fecha) this.id_fecha = id_fecha;
        else this.id_fecha = null;

        if (fecha) this.fecha = fecha;
        else this.fecha = null;

        if (estado) this.estado = estado;
        else this.estado = new EstadoFecha();

        if (partidos) this.partidos = partidos;
        else this.partidos = new Array<Partido>();

        if (fixture) this.fixture = fixture;
        else this.fixture = new Fixture();

    }
}