import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Torneo, Categoria, Club, Equipo } from '../../../entities/index';
import { CategoriaService, TorneoService, ClubService } from '../../../services/index';



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
    public torneo: Torneo;
    public categoria: Categoria;

    public lsCategorias = new Array<Categoria>();
    public lsTorneos = new Array<Torneo>();
    public lsClub = new Array<Club>();


    constructor(
        private categoriasService: CategoriaService,
        private clubService: ClubService,
        private torneoService: TorneoService
    ) {
        this.cargarCategorias();
        this.cargarClubes();
        this.cargarTorneos();
    }




// METODOS-----------------------------------------------------------------------------

    cargarCategorias() {
        this.categoriasService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.json().length; i++) {
                    let categoria = new Categoria(
                        data.json()[i]["id_categoria"],
                        data.json()[i]["descripcion"]
                    );
                    this.lsCategorias.push(categoria);
                }
            },
            error => {
                this.lsCategorias = new Array<Categoria>();
                error.json()["Message"];
            });
    }

    cargarTorneos(){
        this.torneoService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.json().length; i++) {
                    let torneo = new Torneo(
                        data.json()[i]["id_torneo"],
                        data.json()[i]["nombre"]
                    );
                    this.lsTorneos.push(torneo);
                }
            },
            error => {
                this.lsTorneos = new Array<Torneo>();
                error.json()["Message"];
            });
    }

    cargarClubes(){
        this.clubService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.json().length; i++) {
                    const club = new Club(
                        data.json()[i]['id_club'],
                        data.json()[i]['nombre']
                    );
                    this.lsClub.push(club);
                }
            },
            error => {
                this.lsClub = new Array<Club>();
                error.json()['Message'];
            });
    }


}
