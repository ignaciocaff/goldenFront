import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Torneo } from '../../entities/index';

@Injectable()
export class TorneoService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'torneo/todos').map((response: Response) => response.json());
    }

    getByName(nombre: String) {
        return this.http.get(this.config.apiUrl + 'torneo/' + nombre).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'torneo/registrar', obj);
    }

    update(obj: any) {
        return this.http.post(this.config.apiUrl + 'torneo/update', obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'torneo/' + id);
    }
}
