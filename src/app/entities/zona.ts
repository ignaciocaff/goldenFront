import {
    Equipo,
    Torneo,
    Fase
} from './index';

export class Zona {
    public id_zona: number;
    public descripcion: string;
    public torneo: Torneo;
    public lsEquipos: Array<Equipo>;
    public fase: Fase;
    constructor(
        id_zona?: number,
        descripcion?: string,
        torneo?: Torneo,
        lsEquipos?: Array<Equipo>,
        fase?: Fase
    ) {
        if (id_zona) this.id_zona = id_zona;
        else this.id_zona = null;

        if (torneo) this.torneo = torneo;
        else this.torneo = new Torneo();

        if (lsEquipos) this.lsEquipos = lsEquipos;
        else this.lsEquipos = new Array<Equipo>();

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (fase) this.fase = fase;
        else this.fase = new Fase();
    }
}
