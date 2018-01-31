export class CategoriaNoticia {

    public id_categoria_noticia: number;
    public descripcion: string;

    constructor(
        id_categoria_noticia?: number,
        descripcion?: string
    ) {
        if (id_categoria_noticia) this.id_categoria_noticia = id_categoria_noticia;
        else this.id_categoria_noticia = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;
    }
}
