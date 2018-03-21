import { Perfil } from './index';


export class Usuario {
    public id_usuario: number;
    public n_usuario: string;
    public password: string;
    public perfil: Perfil;
    public caducidad: Date;

    constructor(
        id_usuario?: number,
        n_usuario?: string,
        password?: string,
        perfil?: Perfil,
        caducidad?: Date,
    ) {
        if (id_usuario) this.id_usuario = id_usuario;
        else this.id_usuario = null;

        if (n_usuario) this.n_usuario = n_usuario;
        else this.n_usuario = null;

        if (password) this.password = password;
        else this.password = null;

        if (perfil) this.perfil = perfil;
        else this.perfil = new Perfil();

        if (caducidad) this.caducidad = caducidad;
        else this.caducidad = null
    }
}