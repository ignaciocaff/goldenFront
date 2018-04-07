import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Regla } from '../../entities/index';

@Injectable()
export class ReglasService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'reglas').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + 'reglas/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'reglas/registrar', obj);
    }

    update(obj: any) {
        return this.http.post(this.config.apiUrl + 'reglas/update', obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'reglas/' + id);
    }
    
    registrarReglamento(obj: any) {
        return this.http.post(this.config.apiUrl + 'reglamento/registrar', obj);
    }

    getReglamento(id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'reglamento/' + id_torneo).map((response: Response) => response.json());
    }

    actualizarReglamento(obj: any) {
        return this.http.post(this.config.apiUrl + 'reglamento/update', obj);
    }
}