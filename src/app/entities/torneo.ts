import {
    TipoTorneo,
    Categoria,
    Regla,
    Modalidad
} from './index';

export class Torneo {
    public nombre: string;
    public descripcion: string;
    public fecha_inicio: Date;
    public fecha_fin: Date;
    public tipo_torneo: TipoTorneo;
    public categoria: Categoria;
    public regla_torneo: Regla;
    public modalidad: Modalidad;
    public id_torneo: number;

    constructor(
        nombre?: string,
        descripcion?: string,
        fecha_inicio?: Date,
        fecha_fin?: Date,
        tipo_torneo?: TipoTorneo,
        categoria?: Categoria,
        regla_torneo?: Regla,
        modalidad?: Modalidad,
        id_torneo?: number

    ) {
        if (id_torneo) this.id_torneo = id_torneo;
        else this.id_torneo = null;

        if (nombre) this.nombre = nombre;
        else this.nombre = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (fecha_inicio) this.fecha_inicio = fecha_inicio;
        else this.fecha_inicio = null;

        if (fecha_fin) this.fecha_fin = fecha_fin;
        else this.fecha_fin = null;

        if (tipo_torneo) this.tipo_torneo = tipo_torneo;
        else this.tipo_torneo = new TipoTorneo();

        if (categoria) this.categoria = categoria;
        else this.categoria = new Categoria();

        if (regla_torneo) this.regla_torneo = regla_torneo;
        else this.regla_torneo = new Regla();;

        if (modalidad) this.modalidad = modalidad;
        else this.modalidad = new Modalidad();
    }
}