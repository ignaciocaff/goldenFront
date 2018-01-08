export class Categoria {
    public descripcion: string;
    public id_categoria: number;
    constructor(
        descripcion?: string,
        id_categoria?: number
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id_categoria) this.id_categoria = id_categoria;
        else this.id_categoria = null;
    }
}