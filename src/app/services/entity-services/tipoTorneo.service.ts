import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Categoria } from '../../entities/index';

@Injectable()
export class TipoTorneoService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'tipoTorneo').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + 'tipoTorneo/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'tipoTorneo', obj);
    }

    update(obj: any) {
        return this.http.put(this.config.apiUrl + 'tipoTorneo/' + obj.id, obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'tipoTorneo/' + id);
    }
}