import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DialogService } from '../../../services/common-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';



import {
    Noticia,
    Torneo,
    Club,
    CategoriaNoticia
    // Fecha,
} from '../../../entities/index';

import {
    TorneoService,
    ClubService,
    CategoriaNoticiaService
} from '../../../services/entity-services/index';

@Component({
    selector: 'noticia-carga',
    moduleId: module.id,
    templateUrl: './noticia-carga.component.html',
    styleUrls: ['./noticia-carga.component.css'],
    providers: [
    ]
})

export class NoticiaCargaComponent {
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

    constructor(
        private torneoService: TorneoService,
        private clubService: ClubService,
        private categoriaNoticiasService: CategoriaNoticiaService,
        public toastr: ToastsManager,
        private fileService: FileService
    ) {
        this.cargarTorneos();
        this.cargarClubes();
        this.cargarCategoriasNoticias();
    }

// METODOS-----------------------------------------------------------------------

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
        var subidas = (localStorage.getItem('subidas'));
        this.arraySubidas = JSON.parse(subidas);
        this.noticia.id_thumbnail = Number(this.arraySubidas[0]);
        this.fileService.getImages(this.arraySubidas).subscribe(
            data => {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        this.images.push(data[i]);
                    }

                }
                console.error(this.images);
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

}
