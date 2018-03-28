import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Zona } from '../../entities/index';

@Injectable()
export class ZonaService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll(id: number) {
        return this.http.get(this.config.apiUrl + 'zona/todos/' + id).map((response: Response) => response.json());
    }

    getByName(nombre: String) {
        return this.http.get(this.config.apiUrl + 'zona/' + nombre).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'zona/registrar', obj);
    }

    update(obj: any) {
        return this.http.post(this.config.apiUrl + 'zona/update', obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'zona/' + id);
    }
}
