export class EstadoPartido {
    public descripcion: string;
    public id_estado: number;
    constructor(
        id_estado?: number,
        descripcion?: string
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id_estado) this.id_estado = id_estado;
        else this.id_estado = null;
    }
}