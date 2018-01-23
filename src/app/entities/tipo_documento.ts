export class TipoDocumento {

    public id_tipo_documento: number;
    public descripcion: string;

    constructor(
        id_tipo_documento?: number,
        descripcion?: string
    ) {
        if (id_tipo_documento) this.id_tipo_documento = id_tipo_documento;
        else this.id_tipo_documento = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;
    }
}
