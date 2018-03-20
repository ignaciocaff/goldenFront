import {
    Permiso
} from './index';


export class Perfil {
    public id_perfil: number;
    public n_perfil: string;
    public lsPermisos: Array<Permiso>;

    constructor(
        id_perfil?: number,
        n_perfil?: string,
        lsPermisos?: Array<Permiso>,
    ) {
        if (id_perfil) this.id_perfil = id_perfil;
        else this.id_perfil = null;

        if (n_perfil) this.n_perfil = n_perfil;
        else this.n_perfil = null;

        if (lsPermisos) this.lsPermisos = lsPermisos;
        else this.lsPermisos = new Array<Permiso>();
    }
}