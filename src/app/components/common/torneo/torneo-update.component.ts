import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo } from '../../../entities/index';
import { TipoTorneoService, ModalidadService, ReglasService, CategoriaService, TorneoService } from '../../../services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { EquipoService } from '../../../services/entity-services/index';
import { TorneoLSEmitter } from '../../../services/common-services/index';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialog } from '../../common/dialog/index';


@Component({
    selector: 'torneo-update',
    moduleId: module.id,
    templateUrl: './torneo-update.component.html',
    styleUrls: ['./torneo-update.component.css'],
    providers: [TipoTorneoService, ModalidadService, ReglasService, CategoriaService, TorneoService, EquipoService]
})

export class TorneoUpdateComponent implements OnInit {
    @ViewChild('torneoForm') torneoForm: FormGroup;
    dialogRef: MatDialogRef<ConfirmationDialog>;

    itemList = [];
    selectedItems = [];
    equiposPDesvincular = [];
    settings = {};
    public lsTorneos = new Array<Torneo>();
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
        private router: Router,
        public dialog: MatDialog) {
        this.cargarCategorias();
        this.cargarModalidades();
        this.cargarReglas();
        this.cargarTipoTorneo();
    }

    ngOnInit() {
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

        this.torneoService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.length; i++) {
                    let torneo: Torneo;
                    torneo = data[i];
                    this.lsTorneos.push(torneo);
                }

            }, error => {

            }
        );
    }
    onItemSelect(item: any) {
        for (let i = 0; i < this.lsEquipos.length; i++) {
            if (item.id == this.lsEquipos[i]['id_equipo']) {
                this.lsEquiposToPost.push(this.lsEquipos[i]);
                this.equiposPDesvincular.forEach((item, index) => {
                    if (item == this.lsEquipos[i]) this.equiposPDesvincular.splice(index, 1);
                });
            }
        }
        console.error('En Item Select' + JSON.stringify(this.lsEquiposToPost));
    }

    OnItemDeSelect(item: any) {
        for (let i = 0; i < this.lsEquipos.length; i++) {
            if (item.id == this.lsEquipos[i]['id_equipo']) {
                const index = this.lsEquiposToPost.findIndex((equipo: Equipo) => {
                    return equipo.id_equipo == item.id;
                });
                if (index !== -1) {
                    this.lsEquiposToPost.splice(index, 1);
                    this.equiposPDesvincular.push(this.lsEquipos[i]);
                }

            }
        }
        console.error('En Item DeSelect' + JSON.stringify(this.lsEquiposToPost));
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
        console.error('On select all' + JSON.stringify(this.lsEquiposToPost));
    }
    onDeSelectAll(items: any) {
        this.equiposPDesvincular = this.lsEquiposToPost;
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

    actualizarTorneo() {

        this.torneo.lsEquipos = this.lsEquiposToPost;
        console.log(this.torneo);
        console.log(JSON.stringify(this.equiposPDesvincular));

        this.torneoService.update(this.torneo).subscribe(
            data => {
                if (data) {
                    this.equipoService.desvincular(this.equiposPDesvincular).subscribe(
                        data => {
                            this.toastr.success('El torneo ha sido acctualizado correctamente', 'Exito!');
                            this.limpiar();
                        }, error => {
                            this.toastr.error('No se pudieron desvincular los equipos', 'Error!');
                        }
                    )
                }
            }, error => {
                this.toastr.error('No se pudo actualizar el torneo', 'Error!');
            }
        );
    }

    limpiar() {
        this.torneo = new Torneo();
        this.lsEquiposToPost = [];
        this.equiposPDesvincular = [];
        this.itemList = [];
        this.selectedItems = [];
    }

    routeAlta() {
        this.router.navigate(['home/torneo-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/torneo-update']);
    }

    onTtorneoChange(newValue) {
        this.torneo.tipoTorneo.id_tipo = this.lsTipos.find(x => x.descripcion == newValue).id_tipo;
        this.torneo.tipoTorneo.descripcion = newValue;
    }

    onModalidadChange(newValue) {
        this.torneo.modalidad.id_modalidad = this.lsModalidades.find(x => x.descripcion == newValue).id_modalidad;
        this.torneo.modalidad.descripcion = newValue;
    }

    onReglaChange(newValue) {
        this.torneo.regla.id_regla = this.lsReglas.find(x => x.descripcion == newValue).id_regla;
        this.torneo.regla.descripcion = newValue;
    }

    onCategoriaChange(newValue) {
        this.openConfirmationDialog(newValue);
    }

    openConfirmationDialog(newValue) {
        this.dialogRef = this.dialog.open(ConfirmationDialog, {
            height: '200px',
            width: '300px',
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = "Se desvincularan todos los equipos."

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.torneo.categoria.id_categoria = this.lsCategorias.find(x => x.descripcion == newValue).id_categoria;
                this.torneo.categoria.descripcion = newValue;
                this.equiposPDesvincular = this.lsEquiposToPost;
                this.selectedItems = [];
                this.itemList = [];
                this.lsEquiposToPost = [];
                this.equipoService.getAll().subscribe(
                    data => {
                        this.lsEquipos = data;
                        for (let i = 0; i < data.length; i++) {
                            var equipo = { id: Number, itemName: String };
                            equipo['id'] = data[i]['id_equipo'];
                            equipo['itemName'] = data[i]['nombre'];

                            if (data[i]['categoria']['id_categoria'] == this.torneo.categoria.id_categoria
                                && data[i]['torneo']['id_torneo'] == null) {
                                this.itemList.push(equipo);
                            }
                        }
                    },
                    error => {
                        error.json()['Message'];
                    });

                console.log("Equipos a desvincular:" + JSON.stringify(this.equiposPDesvincular));

            }
            this.dialogRef = null;
        });
    }

    onChange(newValue) {
        this.itemList = [];
        this.lsEquiposToPost = [];
        this.selectedItems = [];
        let torneo: Torneo = newValue;
        this.torneo = torneo;

        this.equipoService.getAll().subscribe(
            data => {
                this.lsEquipos = data;
                for (let i = 0; i < data.length; i++) {
                    var equipo = { id: Number, itemName: String };
                    equipo['id'] = data[i]['id_equipo'];
                    equipo['itemName'] = data[i]['nombre'];
                    if (data[i]['categoria']['id_categoria'] == this.torneo.categoria.id_categoria
                        && (data[i]['torneo']['id_torneo'] == this.torneo.id_torneo || data[i]['torneo']['id_torneo'] == null)) {
                        this.itemList.push(equipo);
                    }
                }
            },
            error => {
                error.json()['Message'];
            });


        for (let i = 0; i < this.torneo.lsEquipos.length; i++) {
            let lsEquipos = this.torneo.lsEquipos;
            let id: Number = lsEquipos[i]['id_equipo'];
            let itemName: String = lsEquipos[i]['nombre'];
            this.selectedItems.push({ id, itemName });
            this.lsEquiposToPost.push(lsEquipos[i]);
        }
    }
}
