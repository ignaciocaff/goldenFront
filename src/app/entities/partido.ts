import {
    Equipo, Arbitro, Veedor, Resultado, ResultadoZona, HorarioFijo, Fecha, EstadoPartido,
    Cancha, Gol, Sancion, Llave, Etapa
} from './index';

export class Partido {
    public id_partido: number;
    public duracion: string;
    public fecha: Fecha;
    public inicio: string;
    public fin: string;
    public local: Equipo;
    public visitante: Equipo;
    public arbitro: Arbitro;
    public estado: EstadoPartido;
    public cancha: Cancha;
    public veedor: Veedor;
    public horario_fijo: HorarioFijo;
    public resultado: Resultado;
    public resultado_zona: ResultadoZona;
    public lsGoleadoresVisitantes: Array<Gol>;
    public lsGoleadoresLocales: Array<Gol>;
    public lsSancionesLocal: Array<Sancion>;
    public lsSancionesVisitante: Array<Sancion>;
    public llave: Llave;
    public etapa: Etapa;
    ganadorPlayoff: Equipo;
    penales: boolean;
    detallePenales: String;
    lsGolesABorrar: Array<Gol>;
    constructor(
        id_partido?: number,
        duracion?: string,
        fecha?: Fecha,
        inicio?: string,
        fin?: string,
        local?: Equipo,
        visitante?: Equipo,
        arbitro?: Arbitro,
        estado?: EstadoPartido,
        cancha?: Cancha,
        veedor?: Veedor,
        horario_fijo?: HorarioFijo,
        resultado?: Resultado,
        resultado_zona?: ResultadoZona,
        lsGoleadoresVisitantes?: Array<Gol>,
        lsGoleadoresLocales?: Array<Gol>,
        lsSancionesLocal?: Array<Sancion>,
        lsSancionesVisitante?: Array<Sancion>,
        llave?: Llave,
        etapa?: Etapa,
        ganadorPlayoff?: Equipo,
        penales?: boolean,
        detallePenales?: String,
        lsGolesABorrar?: Array<Gol>
    ) {
        if (id_partido) this.id_partido = id_partido;
        else this.id_partido = null;

        if (duracion) this.duracion = duracion;
        else this.duracion = null;

        if (fecha) this.fecha = fecha;
        else this.fecha = new Fecha();

        if (duracion) this.duracion = duracion;
        else this.duracion = null;

        if (inicio) this.inicio = inicio;
        else this.inicio = null;

        if (fin) this.fin = fin;
        else this.fin = null;

        if (local) this.local = local;
        else this.local = new Equipo();

        if (visitante) this.visitante = visitante;
        else this.visitante = new Equipo();

        if (arbitro) this.arbitro = arbitro;
        else this.arbitro = new Arbitro();

        if (estado) this.estado = estado;
        else this.estado = new EstadoPartido();

        if (cancha) this.cancha = cancha;
        else this.cancha = new Cancha();

        if (veedor) this.veedor = veedor;
        else this.veedor = new Veedor();

        if (horario_fijo) this.horario_fijo = horario_fijo;
        else this.horario_fijo = new HorarioFijo();

        if (resultado) this.resultado = resultado;
        else this.resultado = new Resultado();

        if (resultado_zona) this.resultado_zona = resultado_zona;
        else this.resultado_zona = new ResultadoZona();

        if (llave) this.llave = llave;
        else this.llave = new Llave();

        if (etapa) this.etapa = etapa;
        else this.etapa = new Etapa();

        if (lsGolesABorrar) this.lsGolesABorrar = lsGolesABorrar;
        else this.lsGolesABorrar = new Array<Gol>();

        if (lsGoleadoresVisitantes) this.lsGoleadoresVisitantes = lsGoleadoresVisitantes;
        else this.lsGoleadoresVisitantes = new Array<Gol>();

        if (lsGoleadoresLocales) this.lsGoleadoresLocales = lsGoleadoresLocales;
        else this.lsGoleadoresLocales = new Array<Gol>();

        if (lsSancionesLocal) this.lsSancionesLocal = lsSancionesLocal
        else this.lsSancionesLocal = new Array<Sancion>();

        if (lsSancionesVisitante) this.lsSancionesVisitante = lsSancionesVisitante
        else this.lsSancionesVisitante = new Array<Sancion>();

        if (penales) this.penales = penales;
        else this.penales = null;

        if (detallePenales) this.detallePenales = detallePenales;
        else this.detallePenales = null;

        if (ganadorPlayoff) this.ganadorPlayoff = ganadorPlayoff;
        else this.ganadorPlayoff = new Equipo();
    }
}