import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Goleador } from '../../../entities/index';
import { PosicionesService } from '../../../services/entity-services/index';
import { AppConfig } from '../../../app.config';

@Component({
    selector: 'goleadores',
    moduleId: module.id,
    templateUrl: './goleadores.component.html',
    styleUrls: ['./goleadores.component.scss'],
    providers: []
})
export class GoleadoresComponent implements OnInit {

    public lsGoleadores = new Array<Goleador>();

    constructor(
        private posicionesService: PosicionesService,
        public config: AppConfig
    ) {
    }

    ngOnInit() {
        var id_torneo = Number(sessionStorage.getItem('id_torneo'));

        this.posicionesService.getGoleadoresPorTorneo(id_torneo).subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let goleador = new Goleador();
                    goleador = data[i];
                    this.lsGoleadores.push(goleador);
                }
            },
            error => {
                error.json()['Message'];
            });
    }
}
