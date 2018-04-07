import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../app.config';
import { Jugador } from '../../entities/index';

@Injectable()
export class JugadorService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'jugador/').map((response: Response) => response.json());
    }

     getById(id: number) {
         return this.http.get(this.config.apiUrl + 'jugador/' + id).map((response: Response) => response.json());
     }

     create(obj: any) {
         return this.http.post(this.config.apiUrl + 'jugador/registrar', obj);
     }

     update(obj: any) {
         return this.http.put(this.config.apiUrl + 'jugador/' + obj.id, obj);
     }

     delete(id: number) {
         return this.http.delete(this.config.apiUrl + 'jugador/' + id);
     }

     getByDoc(doc: number) {
        return this.http.get(this.config.apiUrl + 'persona/' + doc).map((response: Response) => response.json());
     }

     obtenerJugador(obj:any) {
        return this.http.post(this.config.apiUrl + 'jugador/obtenerJugador', obj).map((response: Response) => response.json());
     }
}
