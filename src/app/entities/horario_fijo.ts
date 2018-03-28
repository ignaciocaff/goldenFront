
import { Turno } from './index';

export class HorarioFijo {
    public id_horario: number;
    public turno: Turno;
    public inicio: string;
    public fin: string;

    constructor(
        id_horario?: number,
        turno?: Turno,
        inicio?: string,
        fin?: string
    ) {
        if (id_horario) this.id_horario = id_horario;
        else this.id_horario = null;

        if (turno) this.turno = turno;
        else this.turno = new Turno();

        if (inicio) this.inicio = inicio;
        else this.inicio = null;

        if (fin) this.fin = fin;
        else this.fin = null;
    }
}
