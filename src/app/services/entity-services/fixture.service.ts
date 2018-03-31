import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Categoria } from '../../entities/index';

@Injectable()
export class FixtureService {
    constructor(private http: Http, private config: AppConfig) { }

    create(obj: any, id_zona: number) {
        return this.http.post(this.config.apiUrl + 'fecha/registrar/' + id_zona, obj);
    }

    update(obj: any) {
        return this.http.post(this.config.apiUrl + 'fecha/modificar', obj);
    }

    verificarFecha(obj: any, id_zona: number, id_torneo: number) {
        return this.http.post(this.config.apiUrl + 'fecha/verificar/' + id_zona + '/' + id_torneo, obj);
    }
}
