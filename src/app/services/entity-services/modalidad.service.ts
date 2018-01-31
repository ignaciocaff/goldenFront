import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Categoria } from '../../entities/index';

@Injectable()
export class ModalidadService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'modalidades').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + 'modalidades/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'modalidades', obj);
    }

    update(obj: any) {
        return this.http.put(this.config.apiUrl + 'modalidades/' + obj.id, obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'modalidades/' + id);
    }
}