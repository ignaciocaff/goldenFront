import {
    TipoDocumento,
    Contacto,
    Domicilio
} from './index';


export class Persona {
    public nombre: string;
    public apellido: string;
    public fecha_nacimiento: Date;
    public nro_documento: number;
    public tipoDocumento: TipoDocumento;
    public domicilio: Domicilio;
    public contacto: Contacto;
    public id_persona: number;
    public edad: number;
    public ocupacion: string;
    public id_foto: number;

    constructor(
        nombre?: string,
        apellido?: string,
        fecha_nacimiento?: Date,
        nro_documento?: number,
        tipoDocumento?: TipoDocumento,
        domicilio?: Domicilio,
        contacto?: Contacto,
        id_persona?: number,
        edad?: number,
        ocupacion?: string,
        id_foto?: number
    ) {
        if (id_persona) this.id_persona = id_persona;
        else this.id_persona = null;

        if (nombre) this.nombre = nombre;
        else this.nombre = null;

        if (apellido) this.apellido = apellido;
        else this.apellido = null;

        if (fecha_nacimiento) this.fecha_nacimiento = fecha_nacimiento;
        else this.fecha_nacimiento = null;

        if (nro_documento) this.nro_documento = nro_documento;
        else this.nro_documento = null;

        if (tipoDocumento) this.tipoDocumento = tipoDocumento;
        else this.tipoDocumento = new TipoDocumento();

        if (domicilio) this.domicilio = domicilio;
        else this.domicilio = new Domicilio();

        if (contacto) this.contacto = contacto;
        else this.contacto = new Contacto();

        if(edad) this.edad = edad;
        else this.edad = null;

        if(ocupacion) this.ocupacion = ocupacion;
        else this.ocupacion = '';

        if(id_foto) this.id_foto = id_foto;
        else this.id_foto = null;
    }
}
