import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, Categoria, Club, Equipo } from '../../../entities/index';
import { CategoriaService, TorneoService, ClubService, EquipoService } from '../../../services/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'equipo',
    moduleId: module.id,
    templateUrl: './equipo.component.html',
    styleUrls: ['./equipo.component.css'],
    providers: [ TorneoService, ClubService, CategoriaService, EquipoService ]
})
export class EquipoComponent {
    @ViewChild('equipoForm') equipoForm: FormGroup;
    @BlockUI() blockUI: NgBlockUI;

    public equipo = new Equipo();
    public club: Club;
    public torneo: Torneo;
    public categoria: Categoria;

    public lsCategorias = new Array<Categoria>();
    public lsTorneos = new Array<Torneo>();
    public lsClub = new Array<Club>();


    constructor(
        private categoriasService: CategoriaService,
        private clubService: ClubService,
        private torneoService: TorneoService,
        private equipoService: EquipoService,
        public toastr: ToastsManager
    ) {
        this.cargarCategorias();
        this.cargarClubes();
        this.cargarTorneos();
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

    cargarTorneos() {
        this.torneoService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.json().length; i++) {
                    let torneo = new Torneo(
                        data[i]['id_torneo'],
                        data[i]['nombre']
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
                for (let i = 0; i < data.json().length; i++) {
                    const club = new Club(
                        data[i]['id_club'],
                        data[i]['nombre']
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


}
