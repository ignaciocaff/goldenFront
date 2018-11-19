import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Regla } from '../../entities/index';

@Injectable()
export class SancionService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'sanciones/tipos').map((response: Response) => response.json());
    }

    getUltimaSancion(id_jugador: Number) {
        return this.http.get(this.config.apiUrl + 'sanciones/ultimaSancion/' + id_jugador).map((response: Response) => response.json());
    }

    getZonaParaSancion(id_equipo: Number) {
        return this.http.get(this.config.apiUrl + 'sanciones/zonaPorEquipo/' + id_equipo).map((response: Response) => response.json());
    }

    updateUltimaSancion(obj: any) {
        return this.http.post(this.config.apiUrl + 'sanciones/modificarUltimaSancion', obj);
    }

    getAcumuladoTarjetas(id_torneo: number, id_jugador: number) {
        return this.http.get(
            this.config.apiUrl + 'sanciones/acumuladoJugador/' + id_torneo + '/' + id_jugador)
            .map((response: Response) => response.json());
    }
}