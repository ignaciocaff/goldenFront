import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { Club } from '../../entities/index';

@Injectable()
export class ClubService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + 'club/todos').map((response: Response) => response.json());
    }

     getById(id: number) {
         return this.http.get(this.config.apiUrl + 'clubes/' + id).map((response: Response) => response.json());
     }

     create(obj: any) {
         return this.http.post(this.config.apiUrl + 'clubes/register', obj);
     }

     update(obj: any) {
         return this.http.put(this.config.apiUrl + 'clubes/' + obj.id, obj);
     }

     delete(id: number) {
         return this.http.delete(this.config.apiUrl + 'clubes/' + id);
     }
}
