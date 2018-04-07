import { IEquipo, Cancha, HorarioFijo, Gol } from './index';

export class IPartido {
    id_partido: number;
    local: Array<IEquipo>;
    visitante: Array<IEquipo>;
    cancha: Cancha;
    horario: HorarioFijo;
    fecha: Date;
    id_fixture: number;
    lsGoleadoresVisitantes: Array<Gol>;
    lsGoleadoresLocales: Array<Gol>;

    constructor(
        id_partido?: number,
        local?: Array<IEquipo>,
        visitante?: Array<IEquipo>,
        cancha?: Cancha,
        horario?: HorarioFijo,
        fecha?: Date,
        id_fixture?: number
    ) {
        if (id_partido) this.id_partido = id_partido;
        else this.id_partido = null;

        if (local) this.local = local;
        else this.local = new Array<IEquipo>();

        if (visitante) this.visitante = visitante;
        else this.visitante = new Array<IEquipo>();

        if (cancha) this.cancha = cancha;
        else this.cancha = new Cancha();

        if (horario) this.horario = horario;
        else this.horario = new HorarioFijo();

        if (fecha) this.fecha = fecha;
        else this.fecha = null;

        if (id_fixture) this.id_fixture = id_fixture;
        else this.id_fixture = null;
    }
}