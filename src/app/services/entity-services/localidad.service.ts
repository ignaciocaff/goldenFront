import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Localidad } from '../../entities/index';

@Injectable()
export class LocalidadService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'domicilio/localidades').map((response: Response) => response.json());
    }

    getByProvincia(id: number) {
        return this.http.get(this.config.apiUrl + 'domicilio/localidades/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'domicilio/provincias/rlocalidad', obj);
    }

    update(obj: any) {
        return this.http.put(this.config.apiUrl + 'users/' + obj.id, obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'users/' + id);
    }
}