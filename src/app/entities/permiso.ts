import {
    TipoDocumento,
    Contacto,
    Domicilio
} from './index';


export class Permiso {
    public descripcion: string;
    public fechaExpiracion: Date;

    constructor(
        descripcion?: string,
        fechaExpiracion?: Date,
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (fechaExpiracion) this.fechaExpiracion = fechaExpiracion;
        else this.fechaExpiracion = null;
    }
}