import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, Categoria, Club, Equipo, Jugador } from '../../../entities/index';
import { CategoriaService, ClubService, EquipoService } from '../../../services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ConfirmationDialog } from '../../common/dialog/index';

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

    dialogRef: MatDialogRef<ConfirmationDialog>;
    displayedColumns = ['apellido', 'nombre', 'nro_documento', 'id_jugador'];


    public equipo = new Equipo();
    public club: Club;
    public categoria: Categoria;

    public lsCategorias = new Array<Categoria>();
    public lsCategoriasTorneo = new Array<Torneo>();
    public lsEquipos = new Array<Equipo>();
    public lsJugadores = new Array<Jugador>();
    public lsClub = new Array<Club>();
    dataSource = new MatTableDataSource<Jugador>();

    errorMessage: string;
    imagesEscudos: Array<any> = [];
    imagesCamisetas: Array<any> = [];
    imagesCE: Array<any> = [];
    arraySubidas: Array<any> = [];
    params: string;
    eligioEquipo: Boolean;

    constructor(
        private categoriasService: CategoriaService,
        private clubService: ClubService,
        private equipoService: EquipoService,
        public toastr: ToastsManager,
        private fileService: FileService,
        private router: Router,
        public dialog: MatDialog
    ) {
        this.cargarCategorias();
        this.cargarClubes();
        this.cargarTorneos();
        this.eligioEquipo = false;
    }

    ngOnInit() {
        this.equipoService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.length; i++) {
                    let equipo: Equipo;
                    equipo = data[i];
                    if (equipo.torneo.id_torneo != null && equipo.torneo.id_torneo == JSON.parse(sessionStorage.getItem('id_torneo'))) {
                        this.lsEquipos.push(equipo);
                    }
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
                        data[i]['nombre']
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
        this.equipoService.update(this.equipo).subscribe(
            data => {
                console.log(this.equipo);
                this.toastr.success('El equipo se ha modificado correctamente', 'Exito!');
                this.limpiarCampos();
            },
            error => {
                this.toastr.error('El equipo no se ha modificado", "Error!');
            });
    }


    onTipoCategoriaChange(newValue) {
        this.equipo.categoria.id_categoria = this.lsCategorias.find(x => x.descripcion == newValue).id_categoria;
        this.equipo.categoria.descripcion = newValue;
    }

    onCategoriaChange(newValue) {
        this.equipo.torneo.id_torneo = this.lsCategoriasTorneo.find(x => x.nombre == newValue).id_torneo;
        this.equipo.torneo.nombre = newValue;
    }

    onChange(newValue) {
        let equipo: Equipo = newValue;
        this.equipo = equipo;
        this.eligioEquipo = true;
        console.log(this.equipo);
        this.equipoService.getJugadoresByIdEquipo(this.equipo.id_equipo).subscribe(
            data => {
                this.dataSource = null;
                this.lsJugadores = [];
                for (let i = 0; i < data.length; i++) {
                    var jugador = new Jugador();
                    jugador = data[i];
                    this.lsJugadores.push(jugador);
                }
                if (this.lsJugadores.length == 0) {
                    this.eligioEquipo = false;
                }
                this.dataSource = new MatTableDataSource(this.lsJugadores);
            },
            error => {
                error.json()['Message'];
            });

        this.fileService.getImagesByEquipo(this.equipo.logo).subscribe(
            data => {
                this.imagesEscudos = [];
                this.imagesEscudos.push(data);
            },
            error => {
            });
        this.fileService.getImagesByEquipo(this.equipo.camiseta).subscribe(
            data => {
                this.imagesCamisetas = [];
                this.imagesCamisetas.push(data);
            },
            error => {
            });
        this.fileService.getImagesByEquipo(this.equipo.camisetalogo).subscribe(
            data => {
                this.imagesCE = [];
                this.imagesCE.push(data);
            },
            error => {
            });
    }

    limpiarCampos() {
        this.equipo = new Equipo();
        this.imagesEscudos = [];
        this.imagesCamisetas = [];
        this.imagesCE = [];
        this.eligioEquipo = false;
        this.dataSource = null;

        this.equipoService.getAll().subscribe(
            data => {
                this.lsEquipos = [];
                for (var i = 0; i < data.length; i++) {
                    let equipo: Equipo;
                    equipo = data[i];
                    if (equipo.torneo.id_torneo != null && equipo.torneo.id_torneo == JSON.parse(sessionStorage.getItem('id_torneo'))) {
                        this.lsEquipos.push(equipo);
                    }
                }

            }, error => {

            }
        );
    }

    routeAlta() {
        this.router.navigate(['home/equipo-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/equipo-update']);
    }
    eliminarJugador(id_jugador: number) {
        this.dialogRef = this.dialog.open(ConfirmationDialog, {
            height: '200px',
            width: '350px',
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = "Se eliminara al jugador de este equipo."

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.equipoService.desvincularJugador(id_jugador).subscribe(
                    data => {
                        if (data) {
                            this.equipoService.getJugadoresByIdEquipo(this.equipo.id_equipo).subscribe(
                                data => {
                                    this.dataSource = null;
                                    this.lsJugadores = [];
                                    for (let i = 0; i < data.length; i++) {
                                        var jugador = new Jugador();
                                        jugador = data[i];
                                        this.lsJugadores.push(jugador);
                                    }
                                    if (this.lsJugadores.length == 0) {
                                        this.eligioEquipo = false;
                                    }
                                    this.dataSource = new MatTableDataSource(this.lsJugadores);
                                },
                                error => {
                                    error.json()['Message'];
                                });
                            this.toastr.success('El jugador se elimino correctamente', 'Exito!');
                        }
                    },
                    error => {
                        error.json()['Message'];
                    });

            }
            this.dialogRef = null;
        });
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
        this.dataSource.data = this.dataSource.data;

    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
