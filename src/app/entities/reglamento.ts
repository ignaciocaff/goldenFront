export class Reglamento {
    public id_reglamento: number;
    public descripcion: string;
    public id_torneo: number;

    constructor(
        id_reglamento?: number,
        descripcion?: string,
        id_torneo?: number
    ) {
        if (id_reglamento) this.id_reglamento = id_reglamento;
        else this.id_reglamento = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id_torneo) this.id_torneo = id_torneo;
        else this.id_torneo = null;
    }
}
