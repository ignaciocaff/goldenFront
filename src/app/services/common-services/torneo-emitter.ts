import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TorneoEmitter {

    private _onMyEvent = new Subject<string>();
    public get onMyEvent(): Observable<any> { return this._onMyEvent.asObservable(); }

    public trigger(value: string) {
        this._onMyEvent.next(value);
    }
}