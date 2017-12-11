import {
    Localidad
} from './index';

export class Domicilio {

    public id_domicilio: number;
    public calle: string;
    public numeracion: number;
    public piso: string;
    public dpto: string;
    public torre: string;
    public localidad: Localidad;
    public codigo_postal: string;
    public barrio: string;
    public observaciones: string;

    constructor(
        id_domicilio?: number,
        calle?: string,
        numeracion?: number,
        piso?: string,
        dpto?: string,
        torre?: string,
        localidad?: Localidad,
        codigo_postal?: string,
        barrio?: string,
        observaciones?: string,
    ) {
        if (id_domicilio) this.id_domicilio = id_domicilio;
        else this.id_domicilio = null;

        if (calle) this.calle = calle;
        else this.calle = null;

        if (numeracion) this.numeracion = numeracion;
        else this.numeracion = null;

        if (piso) this.piso = piso;
        else this.piso = null;

        if (dpto) this.dpto = dpto;
        else this.dpto = null;

        if (torre) this.torre = torre;
        else this.torre = null;

        if (localidad) this.localidad = localidad;
        else this.localidad = new Localidad();

        if (codigo_postal) this.codigo_postal = codigo_postal;
        else this.codigo_postal = null;

        if (barrio) this.barrio = barrio;
        else this.barrio = null;

        if (observaciones) this.observaciones = observaciones;
        else this.observaciones = null;
    }

}