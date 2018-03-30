import { Persona } from './index';

export class Veedor extends Persona {

    public id_veedor: number;
    public fecha_alta: Date;
    constructor(
        id_veedor?: number,
        fecha_alta?: Date,
    ) {
        super();

        if (id_veedor) this.id_veedor = id_veedor;
        else this.id_veedor = null;

        if (fecha_alta) this.fecha_alta = fecha_alta;
        else this.fecha_alta = null;

    }
}
