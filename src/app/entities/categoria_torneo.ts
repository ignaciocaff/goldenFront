export class Categoria {
    public descripcion: string;
    public id_categoria: number;
    constructor(
        id_categoria?: number,
        descripcion?: string
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id_categoria) this.id_categoria = id_categoria;
        else this.id_categoria = null;
    }
}