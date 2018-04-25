import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Categoria } from '../../entities/index';

@Injectable()
export class FixtureService {
    constructor(private http: Http, private config: AppConfig) { }

    create(obj: any, id_zona: number, id_torneo: number) {
        return this.http.post(this.config.apiUrl + 'fecha/registrar/' + id_zona + '/' + id_torneo, obj);
    }

    update(obj: any, id_zona: number, id_torneo: number) {
        return this.http.post(this.config.apiUrl + 'fecha/modificar/' + id_zona + '/' + id_torneo, obj);
    }

    verificarFecha(obj: any, id_zona: number, id_torneo: number) {
        return this.http.post(this.config.apiUrl + 'fecha/verificar/' + id_zona + '/' + id_torneo, obj);
    }

    obtenerPartidos(obj: any, id_torneo: number, id_zona?: number, esInterzonal?: number) {
        if (!esInterzonal) {
            return this.http.post(this.config.apiUrl + 'fecha/obtener/' + id_torneo + '/' + id_zona, obj).map((response: Response) => response.json())
        } else {
            return this.http.post(this.config.apiUrl + 'fecha/obtener/' + id_torneo + '/' + id_zona + '/' + esInterzonal, obj).map((response: Response) => response.json())
        }
    }
    obtenerPartidosClub(obj: any) {
        return this.http.post(this.config.apiUrl + 'fecha/obtenerPartidos', obj).map((response: Response) => response.json())
    }
    eliminarPartido(obj: any) {
        return this.http.post(this.config.apiUrl + 'fecha/eliminarPartido', obj).map((response: Response) => response.json())
    }

    obtenerFechas(id_zona: number, id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'fecha/obtenerTodas/' + id_zona + '/' + id_torneo).map((response: Response) => response.json())
    }

    obtenerFechasInterzonales(id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'fecha/obtenerFInterzonales/' + id_torneo).map((response: Response) => response.json())
    }

    modificarFecha(obj: any) {
        return this.http.post(this.config.apiUrl + 'fecha/modificarFecha', obj).map((response: Response) => response.json())
    }

    obtenerPartidoFZEquipo(obj: any, id_equipo: number, id_torneo: number, id_zona?: number, esInterzonal?: number) {
        if (!esInterzonal) {
            return this.http.post(this.config.apiUrl + 'fecha/obtenerPartido/' + id_equipo + '/' + id_torneo + '/' + id_zona, obj).map((response: Response) => response.json())
        } else {
            return this.http.post(this.config.apiUrl + 'fecha/obtenerPartido/' + id_equipo + '/' + id_torneo + '/' + id_zona + '/' + esInterzonal, obj).map((response: Response) => response.json())
        }
    }

}
