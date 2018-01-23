export class Modalidad {
    public descripcion: string;
    public id_modalidad: number;
    constructor(
        id_modalidad?: number,
        descripcion?: string
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id_modalidad) this.id_modalidad = id_modalidad;
        else this.id_modalidad = null;
    }
}