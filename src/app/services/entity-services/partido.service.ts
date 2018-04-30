import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Partido } from '../../entities/index';

@Injectable()
export class PartidoService {
    constructor(private http: Http, private config: AppConfig) { }

    create(partidos: Array<Partido>, id_fase: number, id_torneo: number
        , esInterzonal: number) {
        return this.http.post(this.config.apiUrl + 'partidos/registrar/' + id_fase + '/'
            + id_torneo + '/' + esInterzonal, partidos);
    }

    update(partido: Partido, id_fase: number, id_torneo: number
        , esInterzonal: number) {
        return this.http.post(this.config.apiUrl + 'partidos/modificar/' + id_fase + '/'
            + id_torneo + '/' + esInterzonal, partido);
    }

    borrarSancion(id_sancion: number) {
        return this.http.get(this.config.apiUrl + 'partido/eliminar/sancion/' + id_sancion).map((response: Response) => response.json());;
    }

    borrarGol(id_gol: number, id_fase: number, id_zona: number) {
        return this.http.get(this.config.apiUrl + 'partido/eliminar/gol/' + id_gol
            + '/' + id_fase + '/' + id_zona).map((response: Response) => response.json());;
    }
}