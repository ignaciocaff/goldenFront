import { Equipo } from './index';

export class Resultado {
    public id_resultado: number;
    public local: Equipo;
    public visitante: Equipo;
    public empate: number;
    constructor(
        id_resultado?: number,
        local?: Equipo,
        visitante?: Equipo,
        empate?: number,
    ) {
        if (id_resultado) this.id_resultado = id_resultado;
        else this.id_resultado = null;

        if (local) this.local = local;
        else this.local = new Equipo();

        if (visitante) this.visitante = visitante;
        else this.visitante = new Equipo();

        if (empate) this.empate = empate;
        else this.empate = null;
    }
}
