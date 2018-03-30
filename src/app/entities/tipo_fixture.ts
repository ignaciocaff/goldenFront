export class TipoFixture {
    public id_tipo: number;
    public descripcion: string;

    constructor(
        id_tipo?: number,
        descripcion?: string
    ) {
        if (id_tipo) this.id_tipo = id_tipo;
        else this.id_tipo = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;
    }
}