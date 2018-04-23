import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { SancionEquipo, Equipo, Torneo } from '../../../entities/index';
import { SancionEquipoService, EquipoService } from '../../../services/entity-services/index';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
    selector: 'sanciones-equipo-carga',
    moduleId: module.id,
    templateUrl: './sanciones-equipo-carga.component.html',
    styleUrls: ['./sanciones-equipo-carga.component.css'],
    providers: []
})
export class SancionEquipoCargaComponent implements OnInit {
    @ViewChild('sancionesEquipoForm') sancionesEquipoForm: FormGroup;
    public sancion = new SancionEquipo();
    public lsEquipos = new Array<Equipo>();


    constructor(
        public toastr: ToastsManager,
        private router: Router,
        private equipoService: EquipoService,
        private sancionEquipoService: SancionEquipoService,
        private spinnerService: Ng4LoadingSpinnerService,
    ) {
    }

    ngOnInit() {
        this.equipoService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let equipo = new Equipo();
                    equipo = data[i];
                    if (equipo.torneo.id_torneo != null && equipo.torneo.id_torneo == JSON.parse(sessionStorage.getItem('id_torneo'))) {
                        this.lsEquipos.push(equipo);
                    }
                }
            },
            error => {
                this.lsEquipos = new Array<Equipo>();
                error.json()['Message'];
            });

        var id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.sancion.torneo = new Torneo();
        this.sancion.torneo.id_torneo = id_torneo;
    }

    registrarSancion() {
        if (this.sancion.puntos_restados <= 0) {
            this.toastr.error('Los puntos a restar no pueden ser 0 o negativos', 'Error!');
            return;
        }
        this.spinnerService.show();
        this.sancionEquipoService.create(this.sancion).subscribe(
            data => {
                this.spinnerService.hide();
                this.toastr.success('La sanción se ha registrado con éxito.', 'Exito!');
                this.limpiar();
            },
            error => {
                this.spinnerService.hide();
                this.toastr.error('La sanción no se ha registrado.", "Error!');
            });
    }


    routeAlta() {
        this.router.navigate(['home/configuraciones/sanciones-equipo-carga']);
    }

    routeModificacion() {
         this.router.navigate(['home/configuraciones/sanciones-equipo-baja']);
     }

    limpiar() {
        this.sancion = new SancionEquipo();
        var id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.sancion.torneo = new Torneo();
        this.sancion.torneo.id_torneo = id_torneo;
    }
}
