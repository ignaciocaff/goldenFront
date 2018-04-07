import { Torneo } from './index';
export class ReglaTorneo {
    public descripcion: string;
    public id_regla: number;
    public torneo: Torneo;

    constructor(
        id_regla?: number,
        descripcion?: string,
        torneo?: Torneo
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id_regla) this.id_regla = id_regla;
        else this.id_regla = null;

        if(torneo) this.torneo = torneo;
        else this.torneo = new Torneo();
    }
}
