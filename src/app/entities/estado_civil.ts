export class EstadoCivil {

    public id_estado_civil: number;
    public n_estado_civil: string;

    constructor(
        id_estado_civil?: number,
        n_estado_civil?: string
    ) {
        if (id_estado_civil) this.id_estado_civil = id_estado_civil;
        else this.id_estado_civil = null;

        if (n_estado_civil) this.n_estado_civil = n_estado_civil;
        else this.n_estado_civil = null;
    }
}