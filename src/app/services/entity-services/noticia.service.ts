import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../app.config';
import { Noticia } from '../../entities/index';

@Injectable()
export class NoticiaService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'noticia/todas').map((response: Response) => response.json());
    }

     getById(id: number) {
         return this.http.get(this.config.apiUrl + 'noticia/' + id).map((response: Response) => response.json());
     }

     create(obj: any) {
         return this.http.post(this.config.apiUrl + 'noticia/registrar', obj);
     }

     update(obj: any) {
         return this.http.put(this.config.apiUrl + 'noticia/' + obj.id, obj);
     }

     delete(id: number) {
         return this.http.delete(this.config.apiUrl + 'noticia/' + id);
     }

     /* getPrincipales(id_torneo: number) {
        return this.http.get(this.config.apiUrl + 'noticia/principales' + id_torneo).map((response: Response) => response.json());
     } */
     getPrincipales() {
        return this.http.get(this.config.apiUrl + 'noticia/principales').map((response: Response) => response.json());
     }

     getSecundarias() {
        return this.http.get(this.config.apiUrl + 'noticia/secundarias').map((response: Response) => response.json());
     }
}
