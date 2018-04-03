

import { Torneo, Fecha, TipoFixture } from './index';

export class Fixture {
    public id_fixture: number;
    public torneo: Torneo;
    public fechas: Array<Fecha>;
    public tipo_fixture: TipoFixture;

    constructor(
        id_fixture?: number,
        torneo?: Torneo,
        fechas?: Array<Fecha>,
        tipo_fixture?: TipoFixture
    ) {
        if (id_fixture) this.id_fixture = id_fixture;
        else this.id_fixture = null;

        if (torneo) this.torneo = torneo;
        else this.torneo = new Torneo();

        if (fechas) this.fechas = fechas;
        else this.fechas = new Array<Fecha>();

        if (tipo_fixture) this.tipo_fixture = tipo_fixture;
        else this.tipo_fixture = new TipoFixture();
    }
}