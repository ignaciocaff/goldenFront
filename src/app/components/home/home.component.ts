import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NoticiaService } from '../../services/entity-services/index';
import { FileService } from '../../services/entity-services/file.service';
import { Noticia } from '../../entities/index';
import { AppConfig } from '../../app.config';

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: []
})
export class HomeComponent {
    public lsNoticiasPrincipales = new Array<Noticia>();
    public lsNoticiasSecundarias = new Array<Noticia>();

    public lsNotPrincipLink = new Array<any>();
    public lsNotSecundLink = new Array<any>();

    imagesPPal: Array<any> = [];
    imagesSec: Array<any> = [];
    url: string;

    constructor(
        private noticiaService: NoticiaService,
        private fileService: FileService,
        private router: Router,
        private config: AppConfig
    ) {
        this.url = this.config.imgUrl;
        this.cargarNoticias();
    }

    // METODOS-----------------------------------------------------------------------

    verNoticia(id_noticia) {
        this.router.navigate(['home/noticia/' + id_noticia]);
    }

    cargarNoticias() {
        this.cargarNoticiasPrincipales();
        this.cargarNoticiasSecundarias();
    }

    cargarNoticiasPrincipales() {
        this.noticiaService.getPrincipales(Number(sessionStorage.getItem('id_torneo'))).subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let noticia = new Noticia();
                    noticia = data[i];
                    this.lsNoticiasPrincipales.push(noticia);
                }
                this.getThumbnailsPrincipales();
            },
            error => {
                this.lsNoticiasPrincipales = new Array<Noticia>();
                error.json()['Message'];
            });
    }

    getThumbnailsPrincipales() {
        for (let i = 0; i < this.lsNoticiasPrincipales.length; i++) {
            this.fileService.getImagesByNoticia(this.lsNoticiasPrincipales[i].id_noticia).subscribe(
                data => {
                    console.log("DATA" + data[i]);
                    this.imagesPPal = [];
                    if (data) {
                        for (var j = 0; j < data.length; j++) {
                            this.imagesPPal.push(data[j]);
                        }
                        this.relacionarImagenesPrincipales();
                    }
                },
                error => { }
            );
        }
    }

    relacionarImagenesPrincipales() {
        for (let i = 0; i < this.lsNoticiasPrincipales.length; i++) {
            for (let j = 0; j < this.imagesPPal.length; j++) {
                if (this.lsNoticiasPrincipales[i].id_thumbnail == this.imagesPPal[j].Id) {
                    this.lsNotPrincipLink.push({
                        titulo: this.lsNoticiasPrincipales[i].titulo,
                        ruta: this.imagesPPal[j].ImagePath,
                        id_noticia: this.lsNoticiasPrincipales[i].id_noticia });
                }
            }
        }
    }


    cargarNoticiasSecundarias() {
        this.noticiaService.getSecundarias(Number(sessionStorage.getItem('id_torneo'))).subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let noticia = new Noticia();
                    noticia = data[i];
                    this.lsNoticiasSecundarias.push(noticia);
                }
                this.getThumbnailsSecundarias();
            },
            error => {
                this.lsNoticiasSecundarias = new Array<Noticia>();
                error.json()['Message'];
            });
    }

    getThumbnailsSecundarias() {
        for (let i = 0; i < this.lsNoticiasSecundarias.length; i++) {
            this.fileService.getImagesByNoticia(this.lsNoticiasSecundarias[i].id_noticia).subscribe(
                data => {
                    console.log("DATA" + data[i]);
                    this.imagesSec = [];
                    if (data) {
                        for (var j = 0; j < data.length; j++) {
                            this.imagesSec.push(data[j]);
                        }
                        this.relacionarImagenesSecundarias();
                    }
                },
                error => { }
            );
        }
    }

    relacionarImagenesSecundarias() {
        for (let i = 0; i < this.lsNoticiasSecundarias.length; i++) {
            for (let j = 0; j < this.imagesSec.length; j++) {
                if (this.lsNoticiasSecundarias[i].id_thumbnail == this.imagesSec[j].Id) {
                    this.lsNotSecundLink.push({titulo: this.lsNoticiasSecundarias[i].titulo,
                        ruta: this.imagesSec[j].ImagePath,
                        id_noticia: this.lsNoticiasSecundarias[i].id_noticia});
                }
            }
        }
    }

}
