import { Equipo, Arbitro, Veedor, Resultado, ResultadoZona, HorarioFijo, Fecha, EstadoPartido, Cancha } from './index';

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
        resultado_zona?: ResultadoZona
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
    }
}