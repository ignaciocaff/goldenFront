import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReglaTorneo, Torneo } from '../../../entities/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ReglaTorneoService, CategoriaService } from '../../../services/entity-services/index';

@Component({
    selector: 'reglas',
    moduleId: module.id,
    templateUrl: './reglas.component.html',
    styleUrls: ['./reglas.component.css'],
    providers: []
})
export class ReglasComponent {
    @ViewChild('reglaForm') reglaForm: FormGroup;
    public regla = new ReglaTorneo();
    public lsCategoriasTorneo = new Array<Torneo>();


    constructor(
        private reglaService: ReglaTorneoService,
        private categoriasService: CategoriaService,
        public toastr: ToastsManager,
        private router: Router) {
        this.cargarTorneos();
        this.regla.torneo = null;
    }

    registrarRegla() {
        this.reglaService.create(this.regla).subscribe(
            data => {
                if (data) {
                    this.toastr.success('La regla se ha registrado', 'Exito!');
                    this.limpiar();
                }
            },
            error => {
                this.toastr.error('La regla no se ha registrado.', 'Error!');
            });
    }

    cargarTorneos() {
        this.categoriasService.getAllCE().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let torneo = new Torneo();
                    torneo = data[i];
                    this.lsCategoriasTorneo.push(torneo);
                }
            },
            error => {
                this.lsCategoriasTorneo = new Array<Torneo>();
                error.json()['Message'];
            });
    }

    routeAlta() {
        this.router.navigate(['home/configuraciones/reglas']);
    }

    routeModificacion() {
        this.router.navigate(['home/configuraciones/reglas-update']);
    }

    limpiar() {
        this.regla = new ReglaTorneo();
        this.regla.torneo = null;
    }
}
