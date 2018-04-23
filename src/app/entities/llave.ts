export class Llave {
    public id_llave: number;
    public descripcion: string;

    constructor(
        id_llave?: number,
        descripcion?: string,
    ) {
        if (id_llave) this.id_llave = id_llave;
        else this.id_llave = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;
    }
}