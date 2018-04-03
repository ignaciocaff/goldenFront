import { IEquipo, Cancha, HorarioFijo } from './index';

export class IPartido {
    local: Array<IEquipo>;
    visitante: Array<IEquipo>;
    cancha: Cancha;
    horario: HorarioFijo;

    constructor(
        local?: Array<IEquipo>,
        visitante?: Array<IEquipo>,
        cancha?: Cancha,
        horario?: HorarioFijo
    ) {
        if (local) this.local = local;
        else this.local = new Array<IEquipo>();

        if (visitante) this.visitante = visitante;
        else this.visitante = new Array<IEquipo>();

        if (cancha) this.cancha = cancha;
        else this.cancha = new Cancha();

        if (horario) this.horario = horario;
        else this.horario = new HorarioFijo();
    }
}