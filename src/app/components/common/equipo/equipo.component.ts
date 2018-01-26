import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, Categoria, Club, Equipo } from '../../../entities/index';
import { CategoriaService, ClubService, EquipoService } from '../../../services/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';


@Component({
    selector: 'equipo',
    moduleId: module.id,
    templateUrl: './equipo.component.html',
    styleUrls: ['./equipo.component.css'],
    providers: [ ]
})
export class EquipoComponent {
    @ViewChild('equipoForm') equipoForm: FormGroup;
    @BlockUI() blockUI: NgBlockUI;

    public equipo = new Equipo();
    public club: Club;
    public categoria: Categoria;

    public lsCategorias = new Array<Categoria>();
    public lsTorneos = new Array<Torneo>();
    public lsClub = new Array<Club>();

    errorMessage: string;
    images: Array<any> = [];
    arraySubidas: Array<any> = [];
    params: string;


    constructor(
        private categoriasService: CategoriaService,
        private clubService: ClubService,
        private equipoService: EquipoService,
        public toastr: ToastsManager,
        private fileService: FileService
    ) {
        this.cargarCategorias();
        this.cargarClubes();
    }

    // METODOS-----------------------------------------------------------------------------

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

    cargarClubes() {
        this.clubService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const club = new Club(
                        data[i]['id_club'],
                        data[i]['nombre'],
                        data[i]['descripcion']
                    );
                    this.lsClub.push(club);
                }
            },
            error => {
                this.lsClub = new Array<Club>();
                error.json()['Message'];
            });
    }

    registrarEquipo() {
        this.blockUI.start();
        this.equipoService.create(this.equipo).subscribe(
            data => {
                this.toastr.success('El equipo se ha registrado correctamente', 'Exito!');
                this.blockUI.stop();
            },
            error => {
                this.toastr.error('El equipo no se ha registrado, el nombre ya existe para este torneo", "Error!');
                this.blockUI.stop();
            });
    }

    getImageData() {
        var subidas = (localStorage.getItem('subidas'));
        this.arraySubidas = JSON.parse(subidas);
        this.equipo.logo = Number(this.arraySubidas[0]);
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
