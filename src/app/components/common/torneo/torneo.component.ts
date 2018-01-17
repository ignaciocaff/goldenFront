import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, TipoTorneo, Modalidad, Regla, Categoria } from '../../../entities/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TipoTorneoService, ModalidadService, ReglasService, CategoriaService, TorneoService } from '../../../services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'torneo',
    moduleId: module.id,
    templateUrl: './torneo.component.html',
    styleUrls: ['./torneo.component.css'],
    providers: [TipoTorneoService, ModalidadService, ReglasService, CategoriaService, TorneoService]
})

export class TorneoComponent implements OnInit {
    @ViewChild('torneoForm') torneoForm: FormGroup;
    @BlockUI() blockUI: NgBlockUI;

    itemList = [];
    selectedItems = [];
    settings = {};

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
        private tiposTorneoService: TipoTorneoService, private torneoService: TorneoService, public toastr: ToastsManager) {
        this.cargarCategorias();
        this.cargarModalidades();
        this.cargarReglas();
        this.cargarTipoTorneo();
    }

    ngOnInit() {
        this.itemList = [
            { 'id': 1, 'itemName': 'Boca' },
            { 'id': 2, 'itemName': 'River' },
            { 'id': 3, 'itemName': 'Talleres' },
            { 'id': 4, 'itemName': 'Belgrano' },
            { 'id': 5, 'itemName': 'San Lorenzo' },
            { 'id': 6, 'itemName': 'Racing' }
        ];

        this.selectedItems = [];

        this.settings = {
            singleSelection: false,
            text: 'Elija los equipos',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            badgeShowLimit: 100,
            searchAutofocus: true,
            maxHeight: 500,
            searchPlaceholderText: 'Buscar',
            classes: 'multiselect-class-equipos'
        };
    }
    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }

    cargarTipoTorneo() {
        this.tiposTorneoService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const tipo_torneo = new TipoTorneo(
                        data[i]['id_tipo'],
                        data[i]['descripcion']
                    );
                    this.lsTipos.push(tipo_torneo);
                }
            },
            error => {
                this.lsTipos = new Array<TipoTorneo>();
                error.json()['Message'];
            });
    }

    cargarReglas() {
        this.reglasService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const reglas = new Regla(
                        data[i]['id_regla'],
                        data[i]['descripcion']
                    );
                    this.lsReglas.push(reglas);
                }
            },
            error => {
                this.lsReglas = new Array<Regla>();
                error.json()['Message'];
            });
    }

    cargarModalidades() {
        this.modalidadService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const modalidad = new Modalidad(
                        data[i]['id_modalidad'],
                        data[i]['descripcion']
                    );
                    this.lsModalidades.push(modalidad);
                }
            },
            error => {
                this.lsModalidades = new Array<Modalidad>();
                error.json()['Message'];
            });
    }

    cargarCategorias() {
        this.categoriasService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const categoria = new Categoria(
                        data[i]['id_categoria'],
                        data[i]['descripcion']
                    );
                    this.lsCategorias.push(categoria);
                }
            },
            error => {
                this.lsCategorias = new Array<Categoria>();
                error.json()['Message'];
            });
    }

    registrarTorneo() {
        this.blockUI.start(); // Start blocking
        this.torneoService.create(this.torneo).subscribe(
            data => {
                this.toastr.success('El torneo ha sido dado de alta correctamente', 'Exito!');
                this.blockUI.stop();
            },
            error => {
<<<<<<< HEAD
                this.toastr.error('El torneo no se ha creado, el nombre ya existe", "Error!');
=======
                this.toastr.error('El torneo no se ha creado, el nombre ya existe', 'Error!');
>>>>>>> Nacho
                this.blockUI.stop();
            });
    }
}
