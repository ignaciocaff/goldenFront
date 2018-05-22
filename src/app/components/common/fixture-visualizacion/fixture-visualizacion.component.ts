import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Fixture, Fecha, IPartido } from '../../../entities/index';
import { EquipoService, FixtureService } from '../../../services/entity-services/index';
import { FileService } from '../../../services/entity-services/file.service';
import { AppConfig } from '../../../app.config';
import * as moment from 'moment';


@Component({
    selector: 'fixture-visualizacion',
    moduleId: module.id,
    templateUrl: './fixture-visualizacion.component.html',
    styleUrls: ['./fixture-visualizacion.component.scss'],
    providers: []
})
export class FixtureVisualizacionComponent implements OnInit {

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
        this.fixtureService.obtenerFechasInterzonales(this.id_torneo).subscribe(
            data => {
                if (data) {
                    this.lsFechas = [];
                    this.lsFechas = data;

                    for (let i = this.lsFechas.length - 1; i >= 0; i--) {
                        for (let j = 0; j < this.lsFechas.length; j++) {
                            if (this.lsFechas[i].fecha == this.lsFechas[j].fecha
                                && this.lsFechas[i].id_fecha != this.lsFechas[j].id_fecha) {
                                this.lsFechas.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if (this.lsFechas.length)
                        this.mostrarProximaFecha();
                }
            },
            error => {
                this.lsFechas = [];
            });
    }

    mostrarProximaFecha() {
        let hoy = moment();
        let fecha = this.lsFechas[0];
        let posicion: number;

        for (let i = this.lsFechas.length -1 ; i >= 0; i--) {
            if (moment(this.lsFechas[i].fecha).isSameOrAfter(hoy, 'day')) {
                fecha = this.lsFechas[i];
                posicion = i;
            } else {
                break;
            }
        }
        this.mostrarFixtureFecha(fecha, posicion);
//         document.getElementById("btnFecha3").focus();
     }

    mostrarFixtureFecha(fecha: Fecha, i: number) {
        this.lsPartidos = [];
        this.fixtureService.obtenerFixtureFecha(fecha, this.id_torneo).subscribe(
            data => {
                if (data) {
                    this.lsPartidos = data;
                    this.diaVisual = this.formatearFecha(new Date(fecha.fecha));
                    this.numeroFecha = i + 1;
                    this.fechaSeleccionada = true;
                }
            },
            error => {
                error.json()['Message'];
            });
    }

    formatearFecha(fecha: Date) {
        var semana = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');
        var dia_nombre = semana[fecha.getDay()];
        var dd = fecha.getDate();
        var mm = fecha.getMonth() + 1; //enero es 0

        /*         if (dd < 10) { var dd = '0' + dd }
                if (mm < 10) { var mm = '0' + mm } */

        return dia_nombre + ' ' + dd + '.' + mm;
    }
}