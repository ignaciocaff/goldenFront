import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../app.config';
import { SancionEquipo } from '../../entities/index';

@Injectable()
export class PosicionesService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
/*         return this.http.get(this.config.apiUrl + 'personas/tiposdoc').map((response: Response) => response.json());
 */    }

    getPosicionesPorTorneo(id: number) {
        return this.http.get(this.config.apiUrl + 'posiciones/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        /* return this.http.post(this.config.apiUrl + 'sancion_equipo/registrar', obj); */
    }

    update(obj: any) {
/*         return this.http.put(this.config.apiUrl + 'users/' + obj.id, obj); */
    }

    delete(obj: any) {
        /* return this.http.post(this.config.apiUrl + 'sancion_equipo/borrar/', obj); */
    }
}
