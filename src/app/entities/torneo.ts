import {
    TipoTorneo,
    Categoria,
    Regla,
    Modalidad,
    Equipo,
    Fase,
    EstadoTorneo
} from './index';

export class Torneo {
    public id_torneo: number;
    public nombre: string;
    public descripcion: string;
    public fecha_inicio: Date;
    public fecha_fin: Date;
    public tipoTorneo: TipoTorneo;
    public categoria: Categoria;
    public regla: Regla;
    public modalidad: Modalidad;
    public lsEquipos: Array<Equipo>;
    public fase: Fase;
    public estado: EstadoTorneo;


    constructor(
        id_torneo?: number,
        nombre?: string,
        descripcion?: string,
        fecha_inicio?: Date,
        fecha_fin?: Date,
        tipoTorneo?: TipoTorneo,
        categoria?: Categoria,
        regla?: Regla,
        modalidad?: Modalidad,
        lsEquipos?: Array<Equipo>,
        fase?: Fase,
        estado?: EstadoTorneo
    ) {
        if (id_torneo) this.id_torneo = id_torneo;
        else this.id_torneo = null;

        if (lsEquipos) this.lsEquipos = lsEquipos;
        else this.lsEquipos = new Array<Equipo>();

        if (nombre) this.nombre = nombre;
        else this.nombre = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (fecha_inicio) this.fecha_inicio = fecha_inicio;
        else this.fecha_inicio = null;

        if (fecha_fin) this.fecha_fin = fecha_fin;
        else this.fecha_fin = null;

        if (tipoTorneo) this.tipoTorneo = tipoTorneo;
        else this.tipoTorneo = new TipoTorneo();

        if (categoria) this.categoria = categoria;
        else this.categoria = new Categoria();

        if (regla) this.regla = regla;
        else this.regla = new Regla();;

        if (modalidad) this.modalidad = modalidad;
        else this.modalidad = new Modalidad();

        if (estado) this.estado = estado;
        else this.estado = new EstadoTorneo();

        if (fase) this.fase = fase;
        else this.fase = new Fase();
    }
}
