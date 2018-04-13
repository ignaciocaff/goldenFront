import {
    Provincia
} from './index';

export class Domicilio {

    public id_domicilio: number;
    public calle: string;
    public numeracion: number;
    public piso: string;
    public dpto: string;
    public torre: string;
    public provincia: Provincia;
    public barrio: string;
    public observaciones: string;

    constructor(
        id_domicilio?: number,
        calle?: string,
        numeracion?: number,
        piso?: string,
        dpto?: string,
        torre?: string,
        provincia?: Provincia,
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
        
        if (provincia) this.provincia = provincia;
        else this.provincia = new Provincia();

        if (barrio) this.barrio = barrio;
        else this.barrio = null;

        if (observaciones) this.observaciones = observaciones;
        else this.observaciones = null;
    }

}