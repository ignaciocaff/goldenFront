import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, Categoria, Club, Equipo } from '../../../entities/index';
import { CategoriaService, ClubService, EquipoService } from '../../../services/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
    selector: 'equipo-update',
    moduleId: module.id,
    templateUrl: './equipo-update.component.html',
    styleUrls: ['./equipo-update.component.css'],
    providers: []
})
export class EquipoUpdateComponent implements OnInit {
    @ViewChild('equipoForm') equipoForm: FormGroup;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @BlockUI() blockUI: NgBlockUI;


    displayedColumns = ['id', 'name', 'progress'];
    dataSource: MatTableDataSource<UserData>;

    public equipo = new Equipo();
    public club: Club;
    public categoria: Categoria;

    public lsCategorias = new Array<Categoria>();
    public lsCategoriasTorneo = new Array<Torneo>();
    public lsEquipos = new Array<Equipo>();
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

        const users: UserData[] = [];
        for (let i = 1; i <= 25; i++) { users.push(createNewUser(i)); }

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
    }

    ngOnInit() {
        this.equipoService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.length; i++) {
                    let equipo: Equipo;
                    equipo = data[i];
                    this.lsEquipos.push(equipo);
                }

            }, error => {

            }
        );
    }
    // METODOS-----------------------------------------------------------------------------

    cargarTorneos() {
        this.categoriasService.getAllCE().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const torneo = new Torneo(
                        data[i]['id_torneo'],
                        data[i]['descripcion']
                    );
                    this.lsCategoriasTorneo.push(torneo);
                    console.error(this.lsCategoriasTorneo);
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

    modificarEquipo() {
        this.blockUI.start();
        this.equipoService.create(this.equipo).subscribe(
            data => {
                this.toastr.success('El equipo se ha registrado correctamente', 'Exito!');
                this.blockUI.stop();
                this.limpiarCampos();
            },
            error => {
                this.toastr.error('El equipo no se ha registrado, el nombre ya existe para este torneo", "Error!');
                this.blockUI.stop();
            });
    }


    onTipoCategoriaChange(newValue) {
        this.equipo.categoria.id_categoria = this.lsCategorias.find(x => x.descripcion == newValue).id_categoria;
        this.equipo.categoria.descripcion = newValue;
    }

    onCategoriaChange(newValue) {
        this.equipo.torneo.id_torneo = this.lsCategoriasTorneo.find(x => x.descripcion == newValue).id_torneo;
        this.equipo.torneo.descripcion = newValue;
    }

    onChange(newValue) {
        let equipo: Equipo = newValue;
        this.equipo = equipo;
        /*this.equipoService.getAll().subscribe(
                    data => {
                        for (let i = 0; i < data.length; i++) {
                            var equipo = new Equipo();
                            equipo = data[i];
                            this.lsEquipos.push(equipo);
                        }
                    },
                    error => {
                        error.json()['Message'];
                    });*/
    }

    limpiarCampos() {
        this.equipo = new Equipo();
        this.imagesEscudos = [];
        this.imagesCamisetas = [];
        this.imagesCE = [];
    }

    routeAlta() {
        this.router.navigate(['home/equipo-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/equipo-update']);
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

    refreshImages(temp) {
        console.log('Uploaded successfully!');
        this.getImageData(temp);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
        id: id.toString(),
        name: name,
        progress: Math.round(Math.random() * 100).toString()
    };
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];


export interface UserData {
    id: string;
    name: string;
    progress: string;
}
