import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';
import { Noticia } from '../../../entities/index';
import { NoticiaService } from '../../../services/entity-services/index';


@Component({
    selector: 'noticia-visualizacion',
    moduleId: module.id,
    templateUrl: './noticia-visualizacion.component.html',
    styleUrls: ['./noticia-visualizacion.component.css'],
    providers: []
})

export class NoticiaVisualizacionComponent {
    images: Array<any> = [];
    public thumbnail: string;
    public noticia = new Noticia();
    public titulo: string;

    constructor(
        private noticiaService: NoticiaService,
        private fileService: FileService,
        private route: ActivatedRoute
    ) {
        this.titulo = "TITULO MALO";
        this.cargarNoticia(route.snapshot.params['id']);
        this.thumbnail = '/UploadedFiles/barsa.jpg';
        console.log("LA NOTICIA QUE ESTAS BUSCANDO ES " + this.noticia);
        //this.getThumbnails();
    }

    getThumbnails() {
        this.fileService.getImagesByNoticia(this.noticia.id_noticia).subscribe(
            data => {
                this.images = [];
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        this.images.push(data[i]);
                        this.thumbnail = data[0]['ThumbPath'];
                    }
                }
            },
            error => { }
        );
    }

    cargarNoticia(id_noticia) {
        // Number(sessionStorage.getItem('id_torneo'))
        console.log("ENTRANDO A CARGAR NOTICIA CON ID: " + id_noticia + "Y CON TITULO: " + this.titulo);
        this.noticiaService.getById(id_noticia).subscribe(
            data => {
                    this.noticia = data[0];
                    this.titulo = data[0]['descripcion'];
            },
            error => {
                this.noticia = new Noticia();
                error.json()['Message'];
            });

        console.log("NOTICIA ANTES DE SALIR DE METODO " + this.noticia.id_noticia + " Y EL TITULO ES: " + this.titulo);
    }

}
