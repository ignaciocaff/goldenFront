import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { TipoDocumento } from '../../entities/index';

@Injectable()
export class TipoDocumentoService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'personas/tiposdoc', (response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + 'users/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'register', obj);
    }

    update(obj: any) {
        return this.http.put(this.config.apiUrl + 'users/' + obj.id, obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'users/' + id);
    }

}