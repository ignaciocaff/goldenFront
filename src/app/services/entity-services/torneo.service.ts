import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
<<<<<<< HEAD
import { Torneo } from '../../entities/index';
=======
>>>>>>> 30c605507e7739e13d5cbfae3f5d525fc772b975

@Injectable()
export class TorneoService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
<<<<<<< HEAD
        return this.http.get(this.config.apiUrl + 'torneos').map((response: Response) => response.json());
    }

    // getById(id: number) {
    //     return this.http.get(this.config.apiUrl + 'torneo/' + id).map((response: Response) => response.json());
    // }

    // create(obj: any) {
    //     return this.http.post(this.config.apiUrl + 'register', obj);
    // }

    // update(obj: any) {
    //     return this.http.put(this.config.apiUrl + 'torneo/' + obj.id, obj);
    // }

    // delete(id: number) {
    //     return this.http.delete(this.config.apiUrl + 'torneo/' + id);
    // }
=======
        return this.http.get(this.config.apiUrl + 'torneo/reglas').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + 'torneo/' + id).map((response: Response) => response.json());
    }

    create(obj: any) {
        return this.http.post(this.config.apiUrl + 'torneo/registrar', obj);
    }

    update(obj: any) {
        return this.http.put(this.config.apiUrl + 'torneo/' + obj.id, obj);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + 'torneo/' + id);
    }
>>>>>>> 30c605507e7739e13d5cbfae3f5d525fc772b975
}
