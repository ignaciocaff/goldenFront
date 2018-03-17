import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';

@Injectable()
export class CanchaService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'canchas').map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'canchas/registrar', obj);
    }

    update(obj: any) {
        return this.http.post(this.config.apiUrl + 'canchas/update', obj);
    }

    delete(obj: any) {
        return this.http.delete(this.config.apiUrl + 'canchas/eliminar', obj);
    }
}
