import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { HorarioFijo, Turno } from '../../../entities/index';
import { HorarioService } from '../../../services/entity-services/index';
@Component({
    selector: 'horarios-update',
    moduleId: module.id,
    templateUrl: './horarios-update.component.html',
    styleUrls: ['./horarios-update.component.css'],
    providers: []
})
export class HorariosUpdateComponent implements OnInit {

    horarioFijo = new HorarioFijo();
    turnos = new Array<Turno>();
    horarios = new Array<HorarioFijo>();

    constructor(public toastr: ToastsManager,
        private router: Router, private horarioService: HorarioService) {

    }

    ngOnInit() {
        this.horarioFijo.turno = new Turno();

        this.horarioService.getAll().subscribe(
            data => {
                this.horarios = [];
                for (let i = 0; i < data.length; i++) {
                    var horario = new HorarioFijo();
                    horario = data[i];
                    this.horarios.push(horario);
                }
            },
            error => {
                this.turnos = new Array<Turno>();
                error.json()['Message'];
            });

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

    modificarHorario() {
        console.error(this.horarioFijo);
        this.horarioService.update(this.horarioFijo).subscribe(
            data => {
                if (data)
                    this.toastr.success('El horario se modifico correctamente', 'Éxito!');
                this.limpiarCampos();
            }, error => {
                this.toastr.error('Ya existe un horario registrado en ese turno', 'Error!');
            }
        )
    }


    onHorarioChange(newValue) {
        this.horarioFijo = newValue;
    }


    onTurnoChange(newValue) {
        this.horarioFijo.turno.id = this.turnos.find(x => x.descripcion == newValue).id;
    }

    limpiarCampos() {
        this.horarioFijo = new HorarioFijo();
        this.ngOnInit();
    }
}