export class Turno {
    public id: number;
    public descripcion: string;

    constructor(
        id?: number,
        descripcion?: string
    ) {
        if (id) this.id = id;
        else this.id = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;
    }
}
