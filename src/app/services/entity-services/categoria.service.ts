import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Categoria } from '../../entities/index';

@Injectable()
export class CategoriaService {
    constructor(private http: Http, private config: AppConfig) { }

    getAllCE() {
        return this.http.get(this.config.apiUrl + 'torneo/todos').map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get(this.config.apiUrl + 'categorias').map((response: Response) => response.json());
    }
    getById(id: number) {
        return this.http.get(this.config.apiUrl + 'categorias/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'register', obj);
    }

    update(obj: any) {
        return this.http.put(this.config.apiUrl + 'categorias/' + obj.id, obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'categorias' + id);
    }
}
