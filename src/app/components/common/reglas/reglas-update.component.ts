import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReglaTorneo, Torneo } from '../../../entities/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ReglaTorneoService, CategoriaService } from '../../../services/entity-services/index';

@Component({
    selector: 'reglas-update',
    moduleId: module.id,
    templateUrl: './reglas-update.component.html',
    styleUrls: ['./reglas-update.component.css'],
    providers: []
})
export class ReglasUpdateComponent {
    @ViewChild('reglaForm') reglaForm: FormGroup;
    public regla = new ReglaTorneo();
    public lsCategoriasTorneo = new Array<Torneo>();
    public lsReglas = new Array<ReglaTorneo>();



    constructor(
        private reglaService: ReglaTorneoService,
        private categoriasService: CategoriaService,
        public toastr: ToastsManager,
        private router: Router
    ) {
        this.cargarTorneos();
        this.cargarReglas();
    }


    modificarRegla() {
        this.reglaService.update(this.regla).subscribe(
            data => {
                if (data) {
                    this.toastr.success('La regla se ha guardado', 'Exito!');
                    this.limpiar();
                }
            },
            error => {
                this.toastr.error('La regla no se ha guardado.', 'Error!');
            });
    }

    cargarReglas() {
        this.reglaService.getAll().subscribe(
            data => {
                this.lsReglas = [];
                for (let i = 0; i < data.length; i++) {
                    var regla = new ReglaTorneo();
                    regla = data[i];
                    this.lsReglas.push(regla);
                }
            },
            error => {
                error.json()['Message'];
            }
        );
    }

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

    onReglaChange(newValue) {
        let regla: ReglaTorneo = newValue;
        this.regla = regla;
    }

    onTorneoChange(newValue) {
        this.regla.torneo.id_torneo = this.lsCategoriasTorneo.find(x => x.nombre == newValue).id_torneo;
        this.regla.torneo.nombre = newValue;
    }

    routeAlta() {
        this.router.navigate(['home/reglas']);
    }

    routeModificacion() {
        this.router.navigate(['home/reglas-update']);
    }

    limpiar() {
        this.regla = new ReglaTorneo();
        this.cargarReglas();
    }
}
