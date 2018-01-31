import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { Torneo } from '../../entities/index';

@Injectable()
export class TorneoLSEmitter {
    torneoUpdate: Observable<any>;
    private torneoSubject = new Subject<any>();
    constructor() {
        this.torneoUpdate = this.torneoSubject.asObservable();
    }

    public trigger(value) {
        this.torneoSubject.next(value);
    }
}