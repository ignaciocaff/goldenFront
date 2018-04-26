import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Fixture, Fecha } from '../../../entities/index';
import { EquipoService, FixtureService } from '../../../services/entity-services/index';
import { FileService } from '../../../services/entity-services/file.service';


@Component({
    selector: 'fixture-visualizacion',
    moduleId: module.id,
    templateUrl: './fixture-visualizacion.component.html',
    styleUrls: ['./fixture-visualizacion.component.css'],
    providers: []
})
export class FixtureVisualizacionComponent implements OnInit {

    lsFechas = new Array<Fecha>();
    id_torneo: number;
    fixture = new Fixture();

    constructor(
        private equipoService: EquipoService,
        private fileService: FileService,
        private fixtureService: FixtureService
    ) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
    }

    ngOnInit() {
        this.fixtureService.obtenerFechasInterzonales(this.id_torneo).subscribe(
            data => {
                this.lsFechas = [];
                this.lsFechas = data;
            },
            error => {
                this.lsFechas = [];
            });
    }

    mostrarFixtureFecha(fecha: Fecha) {
        this.fixtureService.obtenerFixtureFecha(fecha, this.id_torneo).subscribe(
            data => {
                if (data) {
                    var fix = new Fixture();
                    fix = data;
                    this.fixture = fix;
                    console.log("fix" + JSON.stringify(this.fixture));
                }
            },
            error => {
                error.json()['Message'];
                console.log("erorrere");
            });
    }
}