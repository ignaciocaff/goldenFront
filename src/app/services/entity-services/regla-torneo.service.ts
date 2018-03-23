import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Regla } from '../../entities/index';

@Injectable()
export class ReglaTorneoService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'reglasTorneo').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + 'reglasTorneo/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'reglasTorneo/registrar', obj);
    }

    update(obj: any) {
        return this.http.post(this.config.apiUrl + 'reglasTorneo/update', obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'reglasTorneo/' + id);
    }
}