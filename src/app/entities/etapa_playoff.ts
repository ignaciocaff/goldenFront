export class Etapa {
    public id_etapa: number;
    public descripcion: string;

    constructor(
        id_etapa?: number,
        descripcion?: string,
    ) {
        if (id_etapa) this.id_etapa = id_etapa;
        else this.id_etapa = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;
    }
}