import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { HorarioFijo, Turno } from '../../../entities/index';
import { HorarioService } from '../../../services/entity-services/index';
@Component({
    selector: 'horarios',
    moduleId: module.id,
    templateUrl: './horarios.component.html',
    styleUrls: ['./horarios.component.css'],
    providers: []
})
export class HorariosComponent implements OnInit {

    horarioFijo = new HorarioFijo();
    turnos = new Array<Turno>();


    constructor(public toastr: ToastsManager,
        private router: Router, private horarioService: HorarioService) {

    }

    ngOnInit() {
        this.horarioService.getTurnos().subscribe(
            data => {
                this.turnos = [];
                for (let i = 0; i < data.length; i++) {
                    var turno = new Turno();
                    turno = data[i];
                    this.turnos.push(turno);
                }
            },
            error => {
                this.turnos = new Array<Turno>();
                error.json()['Message'];
            });
    }

    routeAlta() {
        this.router.navigate(['home/configuraciones/horarios-carga']);
    }
    routeModificacion() {
        this.router.navigate(['home/configuraciones/horarios-update']);
    }

    registrarHorario() {
        console.error(this.horarioFijo);
        this.horarioService.create(this.horarioFijo).subscribe(
            data => {
                if (data)
                    this.toastr.success('El horario se registro correctamente', 'Éxito!');
                this.limpiarCampos();
            }, error => {
                this.toastr.error('Ya existe un horario registrado en ese turno', 'Error!');
            }
        )
    }


    onTurnoChange(newValue) {
        this.horarioFijo.turno.id = this.turnos.find(x => x.descripcion == newValue).id;
    }

    limpiarCampos() {
        this.horarioFijo = new HorarioFijo();
        this.ngOnInit();
    }
}