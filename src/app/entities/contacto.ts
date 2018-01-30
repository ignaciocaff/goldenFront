export class Contacto {

    public id_contacto: number;
    public telefono_movil: string;
    public telefono_fijo: string;
    public email: string;

    constructor(
        id_contacto?: number,
        telefono_movil?: string,
        telefono_fijo?: string,
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