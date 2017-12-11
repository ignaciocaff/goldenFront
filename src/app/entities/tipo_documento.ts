export class TipoDocumento {

    public id_tipo_documento: number;
    public n_tipo_documento: string;

    constructor(
        id_tipo_documento?: number,
        n_tipo_documento?: string
    ) {
        if (id_tipo_documento) this.id_tipo_documento = id_tipo_documento;
        else this.id_tipo_documento = null;

        if (n_tipo_documento) this.n_tipo_documento = n_tipo_documento;
        else this.n_tipo_documento = null;
    }
}