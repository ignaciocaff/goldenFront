import {
    Provincia
} from './index';

export class Localidad {
    public id_localidad: number;
    public n_localidad: string;

    constructor(
        id_localidad?: number,
        n_localidad?: string,
    ) {
        if (id_localidad) this.id_localidad = id_localidad;
        else this.id_localidad = null;

        if (n_localidad) this.n_localidad = n_localidad;
        else this.n_localidad = null;
    }
}