import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Categoria, ParametrosFixture } from '../../entities/index';

@Injectable()
export class FixtureService {
    constructor(private http: Http, private config: AppConfig) { }

    create(obj: any, id_zona: number, id_torneo: number, fecha: Date) {
        return this.http.post(this.config.apiUrl + 'fecha/registrar/' + id_zona + '/' + id_torneo + '/' + fecha, obj);
    }

    createInterzonal(obj: any, id_torneo: number, id_fase: number) {
        return this.http.post(this.config.apiUrl + 'fecha/registrarInterzonal/' + id_torneo + '/' + id_fase, obj);
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
    eliminarPartido(obj: any, id_fase: number) {
        return this.http.post(this.config.apiUrl + 'fecha/eliminarPartido/' + id_fase, obj).map((response: Response) => response.json())
    }

    obtenerFechas(id_zona: number, id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'fecha/obtenerTodas/' + id_zona + '/' + id_torneo).map((response: Response) => response.json())
    }
    obtenerFechasParaSanciones(id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'fecha/obtenerTodasParaSancion/' + id_torneo).map((response: Response) => response.json())
    }

    obtenerFechasInterzonales(id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'fecha/obtenerFInterzonales/' + id_torneo).map((response: Response) => response.json())
    }

    modificarFecha(obj: any) {
        return this.http.post(this.config.apiUrl + 'fecha/modificarFecha', obj).map((response: Response) => response.json())
    }

    modificarFechaInterzonal(id_torneo: number, nuevaFecha: any, fechaVieja: any) {
        return this.http.post(this.config.apiUrl + 'fecha/modificarFechaInterzonal/' + id_torneo + '/' + nuevaFecha, fechaVieja).map((response: Response) => response.json())
    }

    obtenerPartidoFZEquipo(obj: any, id_equipo: number, id_torneo: number, id_zona?: number, esInterzonal?: number) {
        if (!esInterzonal) {
            return this.http.post(this.config.apiUrl + 'fecha/obtenerPartido/' + id_equipo + '/' + id_torneo + '/' + id_zona, obj).map((response: Response) => response.json())
        } else {
            return this.http.post(this.config.apiUrl + 'fecha/obtenerPartido/' + id_equipo + '/' + id_torneo + '/' + id_zona + '/' + esInterzonal, obj).map((response: Response) => response.json())
        }
    }

    obtenerFixtureFecha(obj: any, id_torneo: number) {
        return this.http.post(this.config.apiUrl + 'fecha/obtenerPartidosVisualizacionFixture/' + id_torneo, obj).map((response: Response) => response.json())
    }

    obtenerResultadosFecha(obj: any, id_torneo: number) {
        return this.http.post(this.config.apiUrl + 'fecha/obtenerResultadosVisualizacionFecha/' + id_torneo, obj).map((response: Response) => response.json())
    }

    obtenerFechasJugadas(id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'fecha/obtenerFechasJugadas/' + id_torneo).map((response: Response) => response.json())
    }

    generarFixtureAutomatico(parametros: ParametrosFixture) {
        return this.http.post(this.config.apiUrl + 'fixtureAutomatico/torneo', parametros).map((response: Response) => response.json())
    }

    obtenerTiposDeFixture() {
        return this.http.get(this.config.apiUrl + 'fixtureAutomatico/obtenerTipos/').map((response: Response) => response.json())
    }

}
