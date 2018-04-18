import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo } from '../../../entities/index';
import { TipoTorneoService, ModalidadService, ReglasService, CategoriaService, TorneoService } from '../../../services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { EquipoService } from '../../../services/entity-services/index';
import { TorneoLSEmitter } from '../../../services/common-services/index';

@Component({
    selector: 'torneo',
    moduleId: module.id,
    templateUrl: './torneo.component.html',
    styleUrls: ['./torneo.component.css'],
    providers: [TipoTorneoService, ModalidadService, ReglasService, CategoriaService, EquipoService]
})

export class TorneoComponent implements OnInit {
    @ViewChild('torneoForm') torneoForm: FormGroup;

    itemList = [];
    selectedItems = [];
    settings = {};
    lsEquipos = [];
    lsEquiposToPost = Array<Equipo>();

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
        private tiposTorneoService: TipoTorneoService,
        private torneoService: TorneoService,
        public toastr: ToastsManager,
        public equipoService: EquipoService,
        private torneoLsEmitter: TorneoLSEmitter,
        private router: Router) {
        this.cargarCategorias();
        this.cargarModalidades();
        this.cargarReglas();
        this.cargarTipoTorneo();
    }

    ngOnInit() {

        this.equipoService.getAll().subscribe(
            data => {
                this.lsEquipos = data;
                for (let i = 0; i < data.length; i++) {
                    var equipo = { id: Number, itemName: String };
                    equipo['id'] = data[i]['id_equipo'];
                    equipo['itemName'] = data[i]['nombre'];
                    this.itemList.push(equipo);
                }
            },
            error => {
                error.json()['Message'];
            });

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
        for (let i = 0; i < this.lsEquipos.length; i++) {
            if (item.id == this.lsEquipos[i]['id_equipo']) {
                this.lsEquiposToPost.push(this.lsEquipos[i]);
            }
        }
    }
    OnItemDeSelect(item: any) {
        for (let i = 0; i < this.lsEquipos.length; i++) {
            if (item.id == this.lsEquipos[i]['id_equipo']) {
                const index = this.lsEquiposToPost.findIndex((equipo: Equipo) => {
                    return equipo.id_equipo == item.id;
                });
                if (index !== -1) {
                    this.lsEquiposToPost.splice(index, 1);
                }
            }
        }
    }
    onSelectAll(items: any) {
        this.lsEquiposToPost = [];
        for (let i = 0; i < items.length; i++) {
            for (var j = 0; j < this.lsEquipos.length; j++) {
                if (items[i]['id'] == this.lsEquipos[j]['id_equipo']) {
                    this.lsEquiposToPost.push(this.lsEquipos[j]);
                }
            }
        }
    }
    onDeSelectAll(items: any) {
        this.lsEquiposToPost = [];
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
        this.torneo.lsEquipos = this.lsEquiposToPost;
        this.torneo.fase.id_fase = 1;
        this.torneoService.create(this.torneo).subscribe(
            data => {
                this.toastr.success('El torneo ha sido dado de alta correctamente', 'Exito!');
                this.torneoLsEmitter.trigger(this.torneo);
                this.limpiar();
            },
            error => {
                this.toastr.error('El torneo no se ha creado, el nombre ya existe', 'Error!');
            });
    }

    limpiar() {
        this.torneo = new Torneo();
        this.lsEquipos = [];
        this.selectedItems = [];
    }

    routeAlta() {
        this.router.navigate(['home/torneo-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/torneo-update']);
    }
}
