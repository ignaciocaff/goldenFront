import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Usuario } from '../../entities/usuario'

@Injectable()
export class UsuarioService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'users/getAll').map((response: Response) => response.json());
    }

    getById(id: number) {
        //return this.http.get(this.config.apiUrl + '/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: Usuario) {
        return this.http.post(this.config.apiUrl + '/api/users/register', user);
    }

    update(user: Usuario) {
        return this.http.put(this.config.apiUrl + '/users/' + user.n_usuario, user);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/users/' + id);
    }
}