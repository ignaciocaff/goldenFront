import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { Reglamento } from '../../../entities/index';
import { ReglasService } from "../../../services/index";


@Component({
    selector: 'reglamento-carga',
    moduleId: module.id,
    templateUrl: './reglamento-carga.component.html',
    styleUrls: ['./reglamento-carga.component.css'],
    providers: []
})
export class ReglamentoCargaComponent {
    @ViewChild('reglamentoForm') reglamentoForm: FormGroup;

    public reglamento = new Reglamento();
    public esUpdate: boolean = false;
    public id_regla: number;

    constructor(
        public toastr: ToastsManager,
        private router: Router,
        private reglasService: ReglasService
    ) {
        this.reglamento.id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.cargarReglamento();
    }

    registrarReglamento() {
        this.reglasService.registrarReglamento(this.reglamento).subscribe(data => {
            this.toastr.success('El reglamento se ha registrado con éxito.', 'Exito!');
            this.limpiar();
        },
            error => {
                this.toastr.error('El reglamento no se ha registrado.", "Error!');
            });
    }

    cargarReglamento() {
        this.reglasService.getReglamento(this.reglamento.id_torneo).subscribe(
            data => {
                this.reglamento = data;
                this.esUpdate = true;
            },
            error => {
                this.reglamento = new Reglamento();
                error.json()['Message'];
            }
        );
    }

    actualizarReglamento() {
        this.reglasService.actualizarReglamento(this.reglamento).subscribe(
            data => {
                this.toastr.success('El reglamento se ha guardado correctamente.', 'Éxito!');
                this.router.navigate(['home/reglamento']);
                this.limpiar();
            },
            error => {
                this.toastr.error('El reglamento no se ha guardado.", "Error!');
            });
    }

    limpiar() {
        this.reglamento = new Reglamento();
    }
}
