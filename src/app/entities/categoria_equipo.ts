export class CategoriaEquipo {
    public descripcion: string;
    public id: number;
    constructor(
        id?: number,
        descripcion?: string
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id) this.id = id;
        else this.id = null;
    }
}