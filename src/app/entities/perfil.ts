import {
    Permiso
} from './index';


export class Perfil {
    public n_perfil: string;
    public lsPermisos: Array<Permiso>;

    constructor(
        n_perfil?: string,
        lsPermisos?: Array<Permiso>,
    ) {
        if (n_perfil) this.n_perfil = n_perfil;
        else this.n_perfil = null;

        if (lsPermisos) this.lsPermisos = lsPermisos;
        else this.lsPermisos = new Array<Permiso>();
    }
}