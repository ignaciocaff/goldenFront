import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../../app.config';

@Injectable()
export class FileService {
    constructor(private http: Http, private config: AppConfig) { }

    upload(files, parameters) {
        const headers = new Headers();
        const options = new RequestOptions({ headers: headers });
        options.params = parameters;
        return this.http.post(this.config.apiUrl + 'archivos/upload', files, options)
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }
    getImages(files) {
        console.error(files);
        return this.http.post(this.config.apiUrl + 'archivos/getimages', files)
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }

    getImagesByTorneo(id_torneo) {
        return this.http.get(this.config.apiUrl + 'archivos/getbytorneo/' + id_torneo)
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }

    getImagesByNoticia(id_noticia) {
        return this.http.get(this.config.apiUrl + 'archivos/getbynoticia/' + id_noticia)
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }
}
