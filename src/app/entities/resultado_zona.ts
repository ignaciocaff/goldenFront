import { Equipo } from './index';

export class ResultadoZona {
    public id_resultado: number;
    public ganador: Equipo;
    public perdedor: Equipo;
    public empate: number;
    constructor(
        id_resultado?: number,
        ganador?: Equipo,
        perdedor?: Equipo,
        empate?: number,
    ) {
        if (id_resultado) this.id_resultado = id_resultado;
        else this.id_resultado = null;

        if (ganador) this.ganador = ganador;
        else this.ganador = new Equipo();

        if (perdedor) this.perdedor = perdedor;
        else this.perdedor = new Equipo();

        if (empate) this.empate = empate;
        else this.empate = null;
    }
}
