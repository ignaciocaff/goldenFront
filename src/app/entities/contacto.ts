export class Contacto {

    public id_contacto: number;
    public telefono_movil: number;
    public telefono_fijo: number;
    public email: string;
    public telefono_referencia: string;
    public titular: string;

    constructor(
        id_contacto?: number,
        telefono_movil?: number,
        telefono_fijo?: number,
        email?: string,
        telefono_referencia?: string,
        titular?: string
    ) {
        if (id_contacto) this.id_contacto = id_contacto;
        else this.id_contacto = null;

        if (telefono_movil) this.telefono_movil = telefono_movil;
        else this.telefono_movil = null;

        if (telefono_fijo) this.telefono_fijo = telefono_fijo;
        else this.telefono_fijo = null;

        if (email) this.email = email;
        else this.email = null;

        if (telefono_referencia) this.telefono_referencia = telefono_referencia;
        else this.telefono_referencia = null;

        if (titular) this.titular = titular;
        else this.titular = null;
    }
}