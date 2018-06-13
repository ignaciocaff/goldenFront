import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Fixture, Fecha, IPartido } from '../../../../entities/index';
import { EquipoService, FixtureService } from '../../../../services/entity-services/index';
import { FileService } from '../../../../services/entity-services/file.service';
import { AppConfig } from '../../../../app.config';
import * as moment from 'moment';


@Component({
    selector: 'playoff-visualizacion',
    moduleId: module.id,
    templateUrl: './playoff-visualizacion.component.html',
    styleUrls: ['./playoff-visualizacion.component.scss'],
    providers: []
})
export class PlayoffVisualizacionComponent implements OnInit {

    lsFechas = new Array<Fecha>();
    id_torneo: number;
    fixture = new Fixture();
    lsFechasMostrar = new Array<Fecha>();
    lsPartidos = new Array<IPartido>();
    fecha = new Fecha();
    diaVisual: any;
    numeroFecha: number;
    fechaSeleccionada: boolean = false;

    constructor(
        private equipoService: EquipoService,
        private fileService: FileService,
        private fixtureService: FixtureService,
        public config: AppConfig
    ) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
    }

    ngOnInit() {
  
    }
}