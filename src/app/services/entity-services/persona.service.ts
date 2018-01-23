import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';

@Injectable()
export class PersonaService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'users', (response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + 'personas/' + id, (response: Response) => response.json());
    }

     getCbyIdPersona(id: number) {
        return this.http.get(this.config.apiUrl + 'personas/clientes/' + id).map((response: Response) => response.json());
    }

    getByDoc(nroDoc: number) {
        return this.http.get(this.config.apiUrl + 'personas/documento/' + nroDoc).map((response: Response) => response.json());
    }

    getEmpByDoc(nroDoc: number) {
        return this.http.get(this.config.apiUrl + 'personas/empleados/documento/' + nroDoc).map((response: Response) => response.json());
    }
    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'register', obj);
    }

    update(obj: any) {
        return this.http.put(this.config.apiUrl + 'users/' + obj.id, obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'users/' + id);
    }

}