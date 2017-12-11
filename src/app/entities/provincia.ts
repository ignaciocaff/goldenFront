export class Provincia {

    public id_provincia: number;
    public n_provincia: string;

    constructor(
        id_provincia?: number,
        n_provincia?: string
    ) {
        if (id_provincia) this.id_provincia = id_provincia;
        else this.id_provincia = null;

        if (n_provincia) this.n_provincia = n_provincia;
        else this.n_provincia = null;
    }
}