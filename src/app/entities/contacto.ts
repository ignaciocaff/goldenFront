export class Contacto {

    public id_contacto: number;
    public telefono_movil: number;
    public telefono_fijo: number;
    public email: string;

    constructor(
        id_contacto?: number,
        telefono_movil?: number,
        telefono_fijo?: number,
        email?: string,
    ) {
        if (id_contacto) this.id_contacto = id_contacto;
        else this.id_contacto = null;

        if (telefono_movil) this.telefono_movil = telefono_movil;
        else this.telefono_movil = null;

        if (telefono_fijo) this.telefono_fijo = telefono_fijo;
        else this.telefono_fijo = null;

        if (email) this.email = email;
        else this.email = null;
    }
}