import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../app.config';

@Injectable()
export class HorarioService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'horarios').map((response: Response) => response.json());
    }

    getTurnos() {
        return this.http.get(this.config.apiUrl + 'horario/turnos').map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'horario/registrar', obj);
    }

    update(obj: any) {
        return this.http.post(this.config.apiUrl + 'horario/update', obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'horario/' + id);
    }
}
