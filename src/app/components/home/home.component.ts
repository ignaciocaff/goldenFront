import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NoticiaService } from '../../services/entity-services/index';
import { FileService } from '../../services/entity-services/file.service';
import { Noticia } from '../../entities/index';

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

    images: Array<any> = [];
    direccion: string;


    constructor(
        private noticiaService: NoticiaService,
        private fileService: FileService,
        private router: Router
    ) {
        this.cargarNoticias();
        this.direccion = '/UploadedFiles/barsa.jpg';
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
        // Number(sessionStorage.getItem('id_torneo'))
        this.noticiaService.getPrincipales().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let noticia = new Noticia();
                    noticia = data[i];
                    this.lsNoticiasPrincipales.push(noticia);
                }
            },
            error => {
                this.lsNoticiasPrincipales = new Array<Noticia>();
                error.json()['Message'];
            });
    }

        cargarNoticiasSecundarias() {
        // Number(sessionStorage.getItem('id_torneo'))
        this.noticiaService.getSecundarias().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let noticia = new Noticia();
                    noticia = data[i];
                    this.lsNoticiasSecundarias.push(noticia);
                }
            },
            error => {
                this.lsNoticiasSecundarias = new Array<Noticia>();
                error.json()['Message'];
            });
    }

}
