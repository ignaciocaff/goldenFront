import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../app.config';
import { Noticia } from '../../entities/index';

@Injectable()
export class PlayoffService {
    constructor(private http: Http, private config: AppConfig) { }

    getEtapas() {
        return this.http.get(this.config.apiUrl + 'etapas/todas').map((response: Response) => response.json());
    }

    getLlaves() {
        return this.http.get(this.config.apiUrl + 'llaves/todas').map((response: Response) => response.json());
    }

    getPlayoffsTorneo(id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'playoff/' + id_torneo).map((response: Response) => response.json());
    }
}
