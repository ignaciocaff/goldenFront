import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';
import { Noticia, Usuario } from '../../../entities/index';
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

    public id_noti: number;
    esAdmin: boolean = false;
    user: Usuario;

    constructor(
        private noticiaService: NoticiaService,
        private fileService: FileService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.id_noti = route.snapshot.params['id'];
        this.cargarNoticia();
        this.esAdministrador();
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
                //Al ser una sola imagen
                this.thumbnail = this.images[0].ImagePath;
            },
            error => {
                error.json()['Message'];
            }
        );
    }

    cargarNoticia() {
        this.noticiaService.getById(this.id_noti).subscribe(
            data => {
                this.noticia = data;
                this.getThumbnails();
            },
            error => {
                this.noticia = new Noticia();
                error.json()['Message'];
            });
    }

    editarNoticia() {
        var id_not_edit = String(this.noticia.id_noticia);
        this.router.navigate(['/home/noticia-carga'], { queryParams: { id: id_not_edit } });
    }

    esAdministrador() {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (this.user != null) {
            if (this.user.perfil.id_perfil == 1) {
                this.esAdmin = true;
            }
        }
    }
}
