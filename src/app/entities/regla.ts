export class Regla {
    public descripcion: string;
    public id_regla: number;

    constructor(
        id_regla?: number,
        descripcion?: string,
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id_regla) this.id_regla = id_regla;
        else this.id_regla = null;
    }
}
