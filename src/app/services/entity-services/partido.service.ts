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

    update(partido: Partido) {
        return this.http.post(this.config.apiUrl + 'partidos/modificar/', partido);
    }
}