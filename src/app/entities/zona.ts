import {
    Equipo,
    Torneo
} from './index';

export class Zona {
    public id_zona: number;
    public descripcion: string;
    public torneo: Torneo;
    public lsEquipos: Array<Equipo>;

    constructor(
        id_zona?: number,
        descripcion?: string,
        torneo?: Torneo,
        lsEquipos?: Array<Equipo>
    ) {
        if (id_zona) this.id_zona = id_zona;
        else this.id_zona = null;

        if (torneo) this.torneo = torneo;
        else this.torneo = new Torneo();

        if (lsEquipos) this.lsEquipos = lsEquipos;
        else this.lsEquipos = new Array<Equipo>();

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;
    }
}
