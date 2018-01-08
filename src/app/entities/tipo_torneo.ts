export class TipoTorneo {
    public descripcion: string;
    public id_tipo: number;

    constructor(
        descripcion?: string,
        id_tipo?: number
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id_tipo) this.id_tipo = id_tipo;
        else this.id_tipo = null;
    }
}