import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DialogService } from '../../../services/common-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';

import {
    Noticia,
    Torneo,
    Club,
    CategoriaNoticia,
    // Fecha,
} from '../../../entities/index';

import {
    TorneoService,
    ClubService,
    CategoriaNoticiaService,
    NoticiaService
} from '../../../services/entity-services/index';

@Component({
    selector: 'noticia-carga',
    moduleId: module.id,
    templateUrl: './noticia-carga.component.html',
    styleUrls: ['./noticia-carga.component.css'],
    providers: []
})

export class NoticiaCargaComponent implements OnInit {
    @ViewChild('noticiaForm') noticiaForm: FormGroup;
    @BlockUI() blockUI: NgBlockUI;

    public noticia = new Noticia();
    public club: Club;
    public torneo: Torneo;
    public categoriaNoticia: CategoriaNoticia;

    public lsTorneos = new Array<Torneo>();
    public lsClubes = new Array<Club>();
    // public lsFechas = new Array<Fecha>();
    public lsCategoriasNoticias = new Array<CategoriaNoticia>();

    errorMessage: string;
    images: Array<any> = [];
    arraySubidas: Array<any> = [];
    params: string;
    esGeneral: boolean = false;
    esUpdate: boolean = false;

    public id_noti: number;

    constructor(
        private torneoService: TorneoService,
        private clubService: ClubService,
        private categoriaNoticiasService: CategoriaNoticiaService,
        public toastr: ToastsManager,
        private fileService: FileService,
        private noticiaService: NoticiaService,
        private route: ActivatedRoute,
        private router: Router

    ) {
        this.cargarTorneos();
        this.cargarClubes();
        this.cargarCategoriasNoticias();
    }

    // METODOS-----------------------------------------------------------------------

    ngOnInit() {
        this.route.queryParams
          .filter(params => params.id)
          .subscribe(params => {    
            this.id_noti = params.id;
            this.cargarNoticia(this.id_noti);
          });
      }

      cargarNoticia(id) {
        this.noticiaService.getById(id).subscribe(
            data => {
                this.noticia = data;
                this.getThumbnails();
                this.esUpdate = true;

                if (this.noticia.torneo.id_torneo == null){
                    this.esGeneral = true;
                }
            },
            error => {
                this.noticia = new Noticia();
                error.json()['Message'];
            });
    }

    getThumbnails() {
        this.fileService.getImagesByNoticia(this.noticia.id_noticia).subscribe(
            data => {
                this.images = [];
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        this.images.push(data[i]);
                    }
                }
            },
            error => {
                error.json()['Message'];
            }
        );
    }

    limpiar() {
        this.noticia = new Noticia();
        this.images = [];
    }

    registrarNoticia() {
        this.blockUI.start();
        this.noticiaService.create(this.noticia).subscribe(
            data => {
                this.toastr.success('La noticia se ha enviado correctamente.', 'Exito!');
                this.blockUI.stop();
                this.limpiar();
            },
            error => {
                this.toastr.error('La noticia no se ha enviado.", "Error!');
                this.blockUI.stop();
            });
    }

    actualizarNoticia() {
        this.blockUI.start();
        this.noticiaService.update(this.noticia).subscribe(
            data => {
                this.toastr.success('La noticia se ha guardado correctamente.', 'Exito!');
                this.blockUI.stop();                
                this.router.navigate(['home/noticia/' + this.noticia.id_noticia]);
                this.limpiar();
            },
            error => {
                this.toastr.error('La noticia no se ha guardado.", "Error!');
                this.blockUI.stop();
            });
    }

    cargarTorneos() {
        this.torneoService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const torneo = new Torneo(
                        data[i]['id_torneo'],
                        data[i]['nombre'],
                        data[i]['descripcion']
                    );
                    this.lsTorneos.push(torneo);
                }
            },
            error => {
                this.lsTorneos = new Array<Torneo>();
                error.json()['Message'];
            });
    }

    cargarClubes() {
        this.clubService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const club = new Club(
                        data[i]['id_club'],
                        data[i]['nombre'],
                        data[i]['descripcion']
                    );
                    this.lsClubes.push(club);
                }
            },
            error => {
                this.lsClubes = new Array<Club>();
                error.json()['Message'];
            });
    }

    cargarCategoriasNoticias() {
        this.categoriaNoticiasService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const categoriaNoticia = new CategoriaNoticia(
                        data[i]['id_categoria_noticia'],
                        data[i]['descripcion']
                    );
                    this.lsCategoriasNoticias.push(categoriaNoticia);
                }
            },
            error => {
                this.lsCategoriasNoticias = new Array<CategoriaNoticia>();
                error.json()['Message'];
            });
    }

    getImageData() {
        var subidas = (localStorage.getItem('NOTICIAS'));
        this.arraySubidas = JSON.parse(subidas);
        this.noticia.id_thumbnail = Number(this.arraySubidas[0]);
        this.fileService.getImages(this.arraySubidas).subscribe(
            data => {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        this.images.push(data[i]);
                    }

                }
            },
            error => this.errorMessage = error
        );
    }

    refreshImages(status) {
        if (status == true) {
            console.log('Uploaded successfully!');
            this.images = [];
            this.getImageData();
        }
    }

    noticiaGeneral() {
        if (this.esGeneral) {
            this.noticia.torneo.id_torneo = null;
        }
    }

    onTorneoChange(newValue) {
        if (newValue != null) {
            this.noticia.torneo.id_torneo = this.lsTorneos.find(x => x.nombre == newValue).id_torneo;
            this.noticia.torneo.nombre = newValue;
        }
    }

    onCategoriaNoticiaChange(newValue) {
        if (newValue != null) {
            this.noticia.categoriaNoticia.id_categoria_noticia = this.lsCategoriasNoticias.find(x  => x.descripcion == newValue).id_categoria_noticia;
            this.noticia.categoriaNoticia.descripcion = newValue;
        }
    }


}
