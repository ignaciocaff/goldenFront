import { IJugador } from './index';
export class IEquipoPlanilla {
  public id_equipo: number;
  public nombre: string;
  public lsJugadores: Array<IJugador>;


  constructor(
    id_equipo?: number,
    nombre?: string,
    lsJugadores?: Array<IJugador>
  ) {

    if (id_equipo) this.id_equipo = id_equipo;
    else this.id_equipo = null;

    if (nombre) this.nombre = nombre;
    else this.nombre = null;

    if (lsJugadores) this.lsJugadores = lsJugadores;
    else this.lsJugadores = new Array<IJugador>();
  }
}