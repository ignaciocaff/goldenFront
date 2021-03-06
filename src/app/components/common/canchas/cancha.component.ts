import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {
    Cancha, Club
} from '../../../entities/index';
import { CanchaService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'cancha',
    moduleId: module.id,
    templateUrl: './cancha.component.html',
    styleUrls: ['./cancha.component.css'],
    providers: []
})
export class CanchaComponent {
    @ViewChild('canchaForm') canchaForm: FormGroup;

    public cancha = new Cancha();

    constructor(private canchaService: CanchaService, public toastr: ToastsManager, private router: Router) { }

    registrarCancha() {
        console.error(this.cancha)
        this.cancha.club.id_club = 1;

        this.canchaService.create(this.cancha).subscribe(
            data => {
                if (data) {
                    this.toastr.success('La cancha se ha creado', 'Exito!');
                    this.limpiarCampos();
                }
            },
            error => {
                this.toastr.error('La cancha no se ha creado, el nombre ya existe', 'Error!');
            });
    }

    routeAlta() {
        this.router.navigate(['home/canchas']);
    }

    routeModificacion() {
        this.router.navigate(['home/canchas-update']);
    }

    limpiarCampos() {
        this.cancha = new Cancha();
    }
}
