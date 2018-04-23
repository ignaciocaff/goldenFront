import {
    IEquipo,
    Torneo
} from './index';


export class Posiciones {
    public id_posicion: number;
    public equipo: IEquipo;
    public puntos: number;
    public goles_favor: number;
    public goles_contra: number;
    public dif_gol: number;
    public torneo: Torneo;
    public partidos_jugados: number;
    public partidos_ganados: number;
    public partidos_empatados: number;
    public partidos_perdidos: number;

    constructor(
         id_posicion?: number,
         equipo?: IEquipo,
         puntos?: number,
         goles_favor?: number,
         goles_contra?: number,
         dif_gol?: number,
         torneo?: Torneo,
         partidos_jugados?: number,
         partidos_ganados?: number,
         partidos_empatados?: number,
         partidos_perdidos?: number,
    ) {
        if(id_posicion)this.id_posicion = id_posicion;
        else this.id_posicion = null;

        if(equipo)this.equipo = equipo;
        else this.equipo = new IEquipo();

        if(puntos)this.puntos = puntos;
        else this.puntos = null;

        if(goles_favor)this.goles_favor = goles_favor;
        else this.goles_favor = null;

        if(goles_contra)this.goles_contra = goles_contra;
        else this.goles_contra = null;

        if(dif_gol)this.dif_gol = dif_gol;
        else this.dif_gol = null;

        if(torneo)this.torneo = torneo;
        else this.torneo = new Torneo();

        if(partidos_jugados)this.partidos_jugados = partidos_jugados;
        else this.partidos_jugados = null;

        if(partidos_ganados)this.partidos_ganados = partidos_ganados;
        else this.partidos_ganados = null;

        if(partidos_empatados)this.partidos_empatados = partidos_empatados;
        else this.partidos_empatados = null;

        if(partidos_perdidos)this.partidos_perdidos = partidos_perdidos;
        else this.partidos_perdidos = null;
    }
}