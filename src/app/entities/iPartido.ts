import {
    IEquipo, Cancha, HorarioFijo, Gol, Sancion, Jugador, Llave, Fecha
    , Resultado, ResultadoZona, Etapa
} from './index';

export class IPartido {
    id_partido: number;
    local: Array<IEquipo>;
    visitante: Array<IEquipo>;
    cancha: Cancha;
    horario: HorarioFijo;
    fecha: Fecha;
    id_fixture: number;
    lsGolesLocal: Array<Gol>;
    lsGolesVisitante: Array<Gol>;
    lsSancionesLocal: Array<Sancion>;
    lsSancionesVisitante: Array<Sancion>;
    resultado: Resultado;
    resultado_zona: ResultadoZona;
    jugadorLocal: Jugador;
    jugadorVisitante: Jugador;
    llave: Llave;
    desImagenes: boolean;
    desImagenesV: boolean;
    etapa: Etapa;
    equiposPartido: Array<IEquipo>;
    ganadorPlayoff: IEquipo;
    penales: boolean;
    detallePenales: String;
    constructor(
        id_partido?: number,
        local?: Array<IEquipo>,
        visitante?: Array<IEquipo>,
        cancha?: Cancha,
        horario?: HorarioFijo,
        fecha?: Fecha,
        id_fixture?: number,
        lsGolesLocal?: Array<Gol>,
        lsGolesVisitante?: Array<Gol>,
        lsSancionesLocal?: Array<Sancion>,
        lsSancionesVisitante?: Array<Sancion>,
        resultado?: Resultado,
        resultado_zona?: ResultadoZona,
        jugadorLocal?: Jugador,
        jugadorVisitante?: Jugador,
        llave?: Llave,
        etapa?: Etapa,
        desImagenes?: boolean,
        desImagenesV?: boolean,
        equiposPartido?: Array<IEquipo>,
        ganadorPlayoff?: IEquipo,
        penales?: boolean,
        detallePenales?: String
    ) {
        if (id_partido) this.id_partido = id_partido;
        else this.id_partido = null;

        if (ganadorPlayoff) this.ganadorPlayoff = ganadorPlayoff;
        else this.ganadorPlayoff = new IEquipo();

        if (local) this.local = local;
        else this.local = new Array<IEquipo>();

        if (visitante) this.visitante = visitante;
        else this.visitante = new Array<IEquipo>();

        if (cancha) this.cancha = cancha;
        else this.cancha = new Cancha();

        if (horario) this.horario = horario;
        else this.horario = new HorarioFijo();

        if (fecha) this.fecha = fecha;
        else this.fecha = new Fecha();

        if (id_fixture) this.id_fixture = id_fixture;
        else this.id_fixture = null;

        if (lsGolesLocal) this.lsGolesLocal = lsGolesLocal
        else this.lsGolesLocal = new Array<Gol>();

        if (lsGolesVisitante) this.lsGolesVisitante = lsGolesVisitante
        else this.lsGolesVisitante = new Array<Gol>();

        if (lsSancionesLocal) this.lsSancionesLocal = lsSancionesLocal
        else this.lsSancionesLocal = new Array<Sancion>();

        if (lsSancionesVisitante) this.lsSancionesVisitante = lsSancionesVisitante
        else this.lsSancionesVisitante = new Array<Sancion>();

        if (equiposPartido) this.equiposPartido = equiposPartido
        else this.equiposPartido = new Array<IEquipo>();

        if (jugadorLocal) this.jugadorLocal = jugadorLocal
        else this.jugadorLocal = new Jugador();

        if (jugadorVisitante) this.jugadorVisitante = jugadorVisitante
        else this.jugadorVisitante = new Jugador();

        if (llave) this.llave = llave;
        else this.llave = new Llave();

        if (etapa) this.etapa = etapa;
        else this.etapa = new Etapa();

        if (desImagenes) this.desImagenes = desImagenes;
        else this.desImagenes = null;

        if (desImagenesV) this.desImagenesV = desImagenesV;
        else this.desImagenesV = null;

        if (resultado) this.resultado = resultado;
        else this.resultado = new Resultado();

        if (resultado_zona) this.resultado_zona = resultado_zona;
        else this.resultado_zona = new ResultadoZona();

        if (penales) this.penales = penales;
        else this.penales = null;

        if (detallePenales) this.detallePenales = detallePenales;
        else this.detallePenales = null;


    }

    public get golesVisitante(): Array<Gol> {
        return this.lsGolesVisitante;
    }
    public set setGolesVisitante(lsGolesVis: Array<Gol>) {
        this.lsGolesVisitante = lsGolesVis;
    }

    public get golesLocal(): Array<Gol> {
        return this.lsGolesLocal;
    }
    public set setGolesLocal(lsGolesLoc: Array<Gol>) {
        this.lsGolesLocal = lsGolesLoc;
    }

    public get sancionesVisitante(): Array<Sancion> {
        return this.lsSancionesVisitante;
    }
    public set setSancionesVisitante(lsSanVis: Array<Sancion>) {
        this.lsSancionesVisitante = lsSanVis;
    }

    public get sancionesLocal(): Array<Sancion> {
        return this.lsSancionesLocal;
    }
    public set setSancionesLocal(lsSanLocal: Array<Sancion>) {
        this.lsSancionesLocal = lsSanLocal;
    }
}