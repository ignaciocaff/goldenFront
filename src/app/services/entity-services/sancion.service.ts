import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Regla } from '../../entities/index';

@Injectable()
export class SancionService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'sanciones/tipos').map((response: Response) => response.json());
    }
}