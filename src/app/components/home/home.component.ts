import { Component } from '@angular/core';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { NoticiaService } from '../../services/entity-services/index';
import { FileService } from '../../services/entity-services/file.service';
import { Noticia } from '../../entities/index';
import { AppConfig } from '../../app.config';
import { DoCheck, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: []
})
export class HomeComponent implements DoCheck, AfterViewInit {
    public lsNoticiasPrincipales = new Array<Noticia>();
    public lsNoticiasSecundarias = new Array<Noticia>();
    public lsNoticiasHistoricas = new Array<Noticia>();

    public lsNotPrincipLink = new Array<any>();
    public lsNotSecundLink = new Array<any>();
    public lsNotUltimasLink = new Array<any>();

    imagesPPal: Array<any> = [];
    imagesSec: Array<any> = [];
    imagesUltimas: Array<any> = [];
    url: string;
    id_torneo: number;
    private subscription: Subscription;
    private esPrimera: boolean = true;
    
    constructor(
        private noticiaService: NoticiaService,
        private fileService: FileService,
        private router: Router,
        public config: AppConfig
    ) {
        this.url = this.config.imgUrl;
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
    }

    // METODOS-----------------------------------------------------------------------

    ngDoCheck() {
        if ((this.id_torneo !== Number(sessionStorage.getItem('id_torneo'))) || this.esPrimera) {
            this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
            this.cargarNoticiasPrincipales();
            this.esPrimera = false;
        }
    }

    ngAfterViewInit() {
        (<any>window).twttr = (function (d, s, id) {
            let js: any, fjs = d.getElementsByTagName(s)[0],
                t = (<any>window).twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);

            t.e = [];
            t.ready = function (f: any) {
                t.e.push(f);
            };

            return t;
        }(document, 'script', 'twitter-wjs'));

        if ((<any>window).twttr.ready())
            (<any>window).twttr.widgets.load();

        this.subscription = this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd) {
                (<any>window).twttr = (function (d, s, id) {
                    let js: any, fjs = d.getElementsByTagName(s)[0],
                        t = (<any>window).twttr || {};
                    if (d.getElementById(id)) return t;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = 'https://platform.twitter.com/widgets.js';
                    fjs.parentNode.insertBefore(js, fjs);

                    t.e = [];
                    t.ready = function (f: any) {
                        t.e.push(f);
                    };

                    return t;
                }(document, 'script', 'twitter-wjs'));

                if ((<any>window).twttr.ready())
                    (<any>window).twttr.widgets.load();
            }
        });
    }

    verNoticia(id_noticia: number) {
        this.router.navigate(['home/noticia/' + id_noticia]);
    }

    cargarNoticiasPrincipales() {
        this.noticiaService.getPrincipales(this.id_torneo).subscribe(
            data => {
                this.lsNoticiasPrincipales = [];
                this.lsNotPrincipLink = [];
                this.lsNotSecundLink = [];
                for (let i = 0; i < data.length; i++) {
                    let noticia = new Noticia();
                    noticia = data[i];
                    this.lsNoticiasPrincipales.push(noticia);
                }
                this.cargarNoticiasSecundarias();
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
                        id_noticia: this.lsNoticiasPrincipales[i].id_noticia
                    });
                }
            }
        }
        this.lsNotPrincipLink.sort((a, b) => b.id_noticia - a.id_noticia);
    }


    cargarNoticiasSecundarias() {
        this.noticiaService.getSecundarias(this.id_torneo).subscribe(
            data => {
                this.lsNoticiasSecundarias = [];
                for (let i = 0; i < data.length; i++) {
                    let noticia = new Noticia();
                    noticia = data[i];
                    this.lsNoticiasSecundarias.push(noticia);
                }
                this.cargarNoticiasHistoricas();
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
                    this.lsNotSecundLink.push({
                        titulo: this.lsNoticiasSecundarias[i].titulo,
                        ruta: this.imagesSec[j].ImagePath,
                        id_noticia: this.lsNoticiasSecundarias[i].id_noticia
                    });
                }
            }
        }
        this.lsNotSecundLink.sort((a, b) => b.id_noticia - a.id_noticia);
    }

    cargarNoticiasHistoricas() {
        this.noticiaService.getHistoricas(this.id_torneo).subscribe(
            data => {
                this.lsNoticiasHistoricas = [];
                this.lsNotUltimasLink = [];
                for (let i = 0; i < data.length; i++) {
                    let noticia = new Noticia();
                    noticia = data[i];
                    this.lsNoticiasHistoricas.push(noticia);
                }
                this.generarListaUltimasNoticias();
            },
            error => {
                this.lsNoticiasHistoricas = new Array<Noticia>();
                error.json()['Message'];
            });
    }

    generarListaUltimasNoticias() {
        var lsID = new Array<number>();

        for (let i = 0; i < this.lsNoticiasPrincipales.length; i++) {
            lsID.push(this.lsNoticiasPrincipales[i].id_noticia);
        }

        for (let i = 0; i < this.lsNoticiasSecundarias.length; i++) {
            lsID.push(this.lsNoticiasSecundarias[i].id_noticia);
        }

        for (let i = this.lsNoticiasHistoricas.length - 1; i >= 0; i--) {
            for (let j = 0; j < lsID.length; j++) {
                if (this.lsNoticiasHistoricas[i].id_noticia == lsID[j]) {
                    this.lsNoticiasHistoricas.splice(i, 1);
                    break;
                }
            }
        }
        if (this.lsNoticiasHistoricas.length) {
            this.getThumbnailsUltimas();
        }
    }

    getThumbnailsUltimas() {
        for (let i = 0; i < this.lsNoticiasHistoricas.length; i++) {
            this.fileService.getImagesByNoticia(this.lsNoticiasHistoricas[i].id_noticia).subscribe(
                data => {
                    this.imagesUltimas = [];
                    if (data) {
                        for (var j = 0; j < data.length; j++) {
                            this.imagesUltimas.push(data[j]);
                        }
                        this.relacionarImagenesUltimas();
                    }
                },
                error => { }
            );
        }
    }

    relacionarImagenesUltimas() {
        for (let i = 0; i < this.lsNoticiasHistoricas.length; i++) {
            for (let j = 0; j < this.imagesUltimas.length; j++) {
                if (this.lsNoticiasHistoricas[i].id_thumbnail == this.imagesUltimas[j].Id) {
                    this.lsNotUltimasLink.push({
                        titulo: this.lsNoticiasHistoricas[i].titulo,
                        ruta: this.imagesUltimas[j].ThumbPath,
                        id_noticia: this.lsNoticiasHistoricas[i].id_noticia,
                        fecha_noticia: this.lsNoticiasHistoricas[i].fecha
                    });
                }
            }
        }
        this.lsNotUltimasLink.sort((a, b) => b.id_noticia - a.id_noticia);
    }

}
