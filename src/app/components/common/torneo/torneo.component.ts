import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, TipoTorneo, Modalidad, Regla, Categoria } from '../../../entities/index'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TipoTorneoService, ModalidadService, ReglasService, CategoriaService } from '../../../services/index'

@Component({
    selector: 'torneo',
    moduleId: module.id,
    templateUrl: './torneo.component.html',
    styleUrls: ['./torneo.component.css'],
    providers: []
})
export class TorneoComponent {
    @ViewChild('torneoForm') torneoForm: FormGroup;
    @BlockUI() blockUI: NgBlockUI;

    public torneo = new Torneo();
    public lsTipos = new Array<TipoTorneo>();
    public lsModalidades = new Array<Modalidad>();
    public lsReglas = new Array<Regla>();
    public lsCategorias = new Array<Categoria>();

    public tipo: TipoTorneo;
    public regla: Regla;
    public categoria: Categoria;
    public modalidad: Modalidad;

    constructor(private categoriasService: CategoriaService,
        private modalidadService: ModalidadService,
        private reglasService: ReglasService,
        private tiposTorneoService: TipoTorneoService, ) {
        this.cargarCategorias();
        this.cargarModalidades();
        this.cargarReglas();
        this.cargarTipoTorneo();
    }

    cargarTipoTorneo() {
        this.tiposTorneoService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.json().length; i++) {
                    let tipo_torneo = new TipoTorneo(
                        data.json()[i]["id_tipo"],
                        data.json()[i]["descripcion"]
                    );
                    this.lsTipos.push(tipo_torneo);
                }
            },
            error => {
                this.lsTipos = new Array<TipoTorneo>();
                error.json()["Message"];
            });
    }

    cargarReglas() {
        this.reglasService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.json().length; i++) {
                    let reglas = new Regla(
                        data.json()[i]["id_regla"],
                        data.json()[i]["descripcion"]
                    );
                    this.lsReglas.push(reglas);
                }
            },
            error => {
                this.lsReglas = new Array<Regla>();
                error.json()["Message"];
            });
    }

    cargarModalidades() {
        this.modalidadService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.json().length; i++) {
                    let modalidad = new Modalidad(
                        data.json()[i]["id_modalidad"],
                        data.json()[i]["descripcion"]
                    );
                    this.lsModalidades.push(modalidad);
                }
            },
            error => {
                this.lsModalidades = new Array<Modalidad>();
                error.json()["Message"];
            });
    }

    cargarCategorias() {
        this.categoriasService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.json().length; i++) {
                    let categoria = new Categoria(
                        data.json()[i]["id_categoria"],
                        data.json()[i]["descripcion"]
                    );
                    this.lsCategorias.push(categoria);
                }
            },
            error => {
                this.lsCategorias = new Array<Categoria>();
                error.json()["Message"];
            });
    }



}