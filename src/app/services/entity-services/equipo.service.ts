import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Categoria } from '../../entities/index';

@Injectable()
export class EquipoService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'equipo/obtenerTodos').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + 'torneo/equipos' + id).map((response: Response) => response.json());
    }

    getJugadoresByIdEquipo(id: number) {
        return this.http.get(this.config.apiUrl + 'equipo/jugadores/' + id).map((response: Response) => response.json());
    }

    getAllPorTorneo(id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'torneo/equiposPorTorneo' + id_torneo).map((response: Response) => response.json());
    }

    getAllPorZona(id_zona: number) {
        return this.http.get(this.config.apiUrl + 'equipo/equiposPorZona/' + id_zona).map((response: Response) => response.json());
    }

    getAllSinZona() {
        return this.http.get(this.config.apiUrl + 'equipo/equiposSinZona/').map((response: Response) => response.json());
    }

    desvincular(obj: any) {
        return this.http.post(this.config.apiUrl + 'equipo/desvincular', obj);
    }
    desvincularJugador(id_jugador: number) {
        return this.http.get(this.config.apiUrl + 'equipo/desvincular/jugadores/' + id_jugador).map((response: Response) => response.json());
    }
    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'equipo/registrar', obj);
    }

    update(obj: any) {
        return this.http.post(this.config.apiUrl + 'equipo/update', obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'torneo/' + id);
    }
}
