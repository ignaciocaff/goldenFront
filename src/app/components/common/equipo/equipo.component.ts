import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, Categoria, Club, Equipo } from '../../../entities/index';
import { CategoriaService, ClubService, EquipoService } from '../../../services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';


@Component({
    selector: 'equipo',
    moduleId: module.id,
    templateUrl: './equipo.component.html',
    styleUrls: ['./equipo.component.css'],
    providers: []
})
export class EquipoComponent {
    @ViewChild('equipoForm') equipoForm: FormGroup;

    public equipo = new Equipo();
    public club: Club;
    public categoria: Categoria;

    public lsCategorias = new Array<Categoria>();
    public lsCategoriasTorneo = new Array<Torneo>();
    public lsTorneos = new Array<Torneo>();
    public lsClub = new Array<Club>();

    errorMessage: string;
    imagesEscudos: Array<any> = [];
    imagesCamisetas: Array<any> = [];
    imagesCE: Array<any> = [];
    arraySubidas: Array<any> = [];
    params: string;


    constructor(
        private categoriasService: CategoriaService,
        private clubService: ClubService,
        private equipoService: EquipoService,
        public toastr: ToastsManager,
        private fileService: FileService,
        private router: Router
    ) {
        this.cargarCategorias();
        this.cargarClubes();
        this.cargarTorneos();
    }

    // METODOS-----------------------------------------------------------------------------

    cargarTorneos() {
        this.categoriasService.getAllCE().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const torneo = new Torneo(
                        data[i]['id_torneo'],
                        data[i]['nombre']
                    );
                    this.lsCategoriasTorneo.push(torneo);
                }
            },
            error => {
                this.lsCategoriasTorneo = new Array<Torneo>();
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
        this.equipoService.create(this.equipo).subscribe(
            data => {
                this.toastr.success('El equipo se ha registrado correctamente', 'Exito!');
                this.limpiarCampos();
            },
            error => {
                this.toastr.error('El equipo no se ha registrado, el nombre ya existe para este torneo", "Error!');
            });
    }

    limpiarCampos() {
        this.equipo = new Equipo();
        this.imagesEscudos = [];
        this.imagesCamisetas = [];
        this.imagesCE = [];
    }

    getImageData(temp: String) {
        var subidas = (localStorage.getItem(temp.toString()));
        this.arraySubidas = JSON.parse(subidas);
        var id_img = Number(this.arraySubidas[0]);
        this.fileService.getImages(this.arraySubidas).subscribe(
            data => {
                this.arraySubidas = [];
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (temp.toString() == 'ESCUDOS') {
                            this.imagesEscudos = [];
                            this.imagesEscudos.push(data[i]);
                            this.equipo.logo = id_img;
                        } else if (temp.toString() == 'CAMISETAS') {
                            this.imagesCamisetas = [];
                            this.imagesCamisetas.push(data[i]);
                            this.equipo.camiseta = id_img;
                        } else if (temp.toString() == 'CAMISETAESCUDO') {
                            this.imagesCE = [];
                            this.imagesCE.push(data[i]);
                            this.equipo.camisetalogo = id_img;
                        }
                    }

                }
            },
            error => this.errorMessage = error
        );
    }

    routeAlta() {
        this.router.navigate(['home/equipo-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/equipo-update']);
    }

    refreshImages(temp) {
        this.getImageData(temp);
    }
}