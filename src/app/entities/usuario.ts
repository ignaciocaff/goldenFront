import { Perfil } from './index';


export class Usuario {
    public n_usuario: string;
    public password: string;
    public id_perfil: Perfil;
    public caducidad: Date;

    constructor(
        n_usuario?: string,
        password?: string,
        id_perfil?: Perfil,
        caducidad?: Date,
    ) {
        if (n_usuario) this.n_usuario = n_usuario;
        else this.n_usuario = null;

        if (password) this.password = password;
        else this.password = null;

        if (id_perfil) this.id_perfil = id_perfil;
        else this.id_perfil = new Perfil();

        if (caducidad) this.caducidad = caducidad;
        else this.caducidad = null
    }
}