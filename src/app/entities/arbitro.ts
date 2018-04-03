import { Persona } from './index';

export class Arbitro extends Persona {

    public id_arbitro: number;
    public matricula: number;
    constructor(
        id_arbitro?: number,
        matricula?: number,
    ) {
        super();

        if (id_arbitro) this.id_arbitro = id_arbitro;
        else this.id_arbitro = null;

        if (matricula) this.matricula = matricula;
        else this.matricula = null;

    }
}
