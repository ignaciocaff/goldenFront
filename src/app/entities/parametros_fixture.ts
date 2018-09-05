import {
    TipoFixture, Zona
} from './index';

export class ParametrosFixture {
    public zona: Zona;
    public id_torneo: number;
    public id_fase: number;
    public cantidadDiasEntrePartidos: number;
    public tipoDeFixture: TipoFixture;
    public esInterzonal: Boolean;
    public intercalarLocalVisitante: Boolean;
    public fechaInicioFixture: Date;

    constructor(
        zona?: Zona,
        id_torneo?: number,
        id_fase?: number,
        cantidadDiasEntrePartidos?: number,
        tipoDeFixture?: TipoFixture,
        esInterzonal?: Boolean,
        intercalarLocalVisitante?: Boolean,
        fechaInicioFixture?: Date,
    ) {
        if (zona) this.zona = zona;
        else this.zona = new Zona();

        if (id_torneo) this.id_torneo = id_torneo;
        else this.id_torneo = null;

        if (id_fase) this.id_fase = id_fase;
        else this.id_fase = null;

        if (cantidadDiasEntrePartidos) this.cantidadDiasEntrePartidos = cantidadDiasEntrePartidos;
        else this.cantidadDiasEntrePartidos = null;

        if (tipoDeFixture) this.tipoDeFixture = tipoDeFixture;
        else this.tipoDeFixture = new TipoFixture();

        if (esInterzonal) this.esInterzonal = esInterzonal;
        else this.esInterzonal = null;

        if (intercalarLocalVisitante) this.intercalarLocalVisitante = intercalarLocalVisitante;
        else this.intercalarLocalVisitante = null;

        if (fechaInicioFixture) this.fechaInicioFixture = fechaInicioFixture;
        else this.fechaInicioFixture = new Date();
    }
}