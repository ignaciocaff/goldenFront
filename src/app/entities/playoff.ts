import {
    Llave,
    Etapa,
    IEquipo,
    Partido,
    Torneo
} from './index';


export class Playoff {
    public id_playoff: number;
    public llave: Llave;
    public local: IEquipo;
    public visitante: IEquipo;
    public ganador: IEquipo;
    public etapa: Etapa;
    public torneo: Torneo;
    public partido: Partido;

    constructor(
        id_playoff?: number,
        llave?: Llave,
        local?: IEquipo,
        visitante?: IEquipo,
        ganador?: IEquipo,
        etapa?: Etapa,
        torneo?: Torneo,
        partido?: Partido
    ) {
        if (id_playoff) this.id_playoff = id_playoff;
        else this.id_playoff = null;

        if (llave) this.llave = llave;
        else this.llave = new Llave();

        if (local) this.local = local;
        else this.local = new IEquipo();

        if (visitante) this.visitante = visitante;
        else this.visitante = new IEquipo();

        if (ganador) this.ganador = ganador;
        else this.ganador = new IEquipo();

        if (etapa) this.etapa = etapa;
        else this.etapa = new Etapa();

        if (torneo) this.torneo = torneo;
        else this.torneo = new Torneo();

        if (partido) this.partido = partido;
        else this.partido = new Partido();
    }
}