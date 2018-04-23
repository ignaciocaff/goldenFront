export class Fase {

    public id_fase: number;
    public descripcion: string;
    constructor(
        id_fase?: number,
        descripcion?: string,
    ) {
        if (id_fase) this.id_fase = id_fase;
        else this.id_fase = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

    }
}
