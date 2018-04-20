import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { SancionEquipo } from '../../entities/index';

@Injectable()
export class SancionEquipoService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
/*         return this.http.get(this.config.apiUrl + 'personas/tiposdoc').map((response: Response) => response.json());
 */    }

    getSancionesByEquipo(id: number) {
        return this.http.get(this.config.apiUrl + 'sancion_equipo/sanciones/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'sancion_equipo/registrar', obj);
    }

    update(obj: any) {
/*         return this.http.put(this.config.apiUrl + 'users/' + obj.id, obj); */
    }

    delete(id: number) {
/*         return this.http.delete(this.config.apiUrl + 'sancion_equipo/delete');*/
        return this.http.get(this.config.apiUrl + 'sancion_equipo/borrar/' + id);
    }
}
