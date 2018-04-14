import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {
    Cancha, Club
} from '../../../entities/index';
import { CanchaService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'cancha-update',
    moduleId: module.id,
    templateUrl: './cancha-update.component.html',
    styleUrls: ['./cancha-update.component.css'],
    providers: []
})
export class CanchaUpdateComponent {
    @ViewChild('canchaForm') canchaForm: FormGroup;
    public cancha = new Cancha();
    public lsCanchas = new Array<Cancha>();

    constructor(private canchaService: CanchaService, public toastr: ToastsManager, private router: Router
    ) {

        this.canchaService.getAll().subscribe(
            data => {
                this.lsCanchas = [];
                for (let i = 0; i < data.length; i++) {
                    var cancha = new Cancha();
                    cancha = data[i];
                    this.lsCanchas.push(cancha);
                }
            },
            error => {
                error.json()['Message'];
            });
    }

    modificarCancha() {
        this.cancha.club.id_club = 1;

        this.canchaService.update(this.cancha).subscribe(
            data => {
                if (data) {
                    this.toastr.success('La cancha se ha modificado', 'Exito!');
                    this.limpiarCampos();
                }
            },
            error => {
                this.toastr.error('La cancha no se ha modificado, el nuevo nombre ya existe', 'Error!');
            });
    }

    routeAlta() {
        this.router.navigate(['home/configuraciones/canchas']);
    }

    routeModificacion() {
        this.router.navigate(['home/configuraciones/canchas-update']);
    }


    onChange(newValue) {
        let cancha: Cancha = newValue;
        this.cancha = cancha;
    }

    limpiarCampos() {
        this.cancha = new Cancha();

        this.canchaService.getAll().subscribe(
            data => {
                this.lsCanchas = [];
                for (let i = 0; i < data.length; i++) {
                    var cancha = new Cancha();
                    cancha = data[i];
                    this.lsCanchas.push(cancha);
                }
            },
            error => {
                error.json()['Message'];
            });
    }

}
