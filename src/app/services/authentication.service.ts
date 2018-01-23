import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Usuario } from '../entities/index';
import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private config: AppConfig) { }
    usuario: Usuario;
    login(n_usuario: string, password: string) {
        return this.http.post(this.config.apiUrl + 'users/authenticate', { n_usuario: n_usuario, password: password })
            .map((response: Response) => {
                if (response.status === 400) {
                    return [{ status: response.status, json: response }];
                } else if (response.status === 401) {
                    return [{ status: response.status, json: response }];
                } else {
                    // login successful if there's a jwt token in the response
                    this.usuario = response.json();
                    if (this.usuario) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        sessionStorage.setItem('currentUser', JSON.stringify(this.usuario));
                    }
                }
            });
    }

    logout() {
        sessionStorage.removeItem('currentUser');
        return this.http.get(this.config.apiUrl + 'users/logout').map((response: Response) => response.json());
    }
}