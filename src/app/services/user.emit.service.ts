import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Usuario } from '../entities/index'

@Injectable()
export class SharedService {

    public newUserSubject = new Subject<any>();
    private user: Usuario = new Usuario();

    getUser() {
        return this.user;
    }
    setUser(usuario: Usuario) {
        this.user = usuario;
    }

    addUser(data) {   
        this.newUserSubject.next(data);
    }
}