import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DialogService } from '../../../services/common-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';


import {
    Jugador,
    TipoDocumento,
    Provincia,
    Localidad,
    Contacto,
    Equipo
} from '../../../entities/index';

import {
    TipoDocumentoService,
    ProvinciaService,
    LocalidadService,
    PersonaService,
    EquipoService,
    JugadorService
} from '../../../services/entity-services/index';

@Component({
    selector: 'jugadores-carga',
    moduleId: module.id,
    templateUrl: './jugadores-carga.component.html',
    styleUrls: ['./jugadores-carga.component.css'],
    providers: [
        TipoDocumentoService,
        ProvinciaService,
        LocalidadService,
        PersonaService,
        DialogService,
        EquipoService,
        JugadorService
    ]
})
export class JugadoresCargaComponent {
    @ViewChild('jugadorForm') jugadorForm: FormGroup;
    @BlockUI() blockUI: NgBlockUI;

    public existeJugador: Boolean;
    public visualizable: Boolean;
    public jugador = new Jugador();
    public tipoDocumento: TipoDocumento;
    public provincia: Provincia;
    public contacto: Contacto = new Contacto();

    public lsProvincias = new Array<Provincia>();
    public lsLocalidades = new Array<Localidad>();
    public lsTiposDocumento = new Array<TipoDocumento>();
    public lsEquipos = new Array<Equipo>();


    constructor(
        private tipoDocumentoService: TipoDocumentoService,
        private provinciaService: ProvinciaService,
        private localidadService: LocalidadService,
        private personaService: PersonaService,
        private dialogService: DialogService,
        private equipoService: EquipoService,
        private jugadorService: JugadorService,
        public toastr: ToastsManager
    ) {
        this.jugador.contacto = this.contacto;
        this.existeJugador = false;
        this.visualizable = false;
        this.cargarTiposDocumento();
        this.cargarProvincias();
        this.cargarEquipos();
        this.cargarLocalidades();
    }

// METODOS-----------------------------------------------------------------------

    cargarTiposDocumento() {
        this.tipoDocumentoService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let tipoDocumento = new TipoDocumento();
                    tipoDocumento = data[i];
                    this.lsTiposDocumento.push(tipoDocumento);
                }
            },
            error => {
                this.lsTiposDocumento = new Array<TipoDocumento>();
                error.json()["Message"];
            });
    }

    cargarProvincias() {
        this.provinciaService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let provincia = new Provincia();
                    provincia = data[i];
                    this.lsProvincias.push(provincia);
                }
            },
            error => {
                this.lsProvincias = new Array<Provincia>();
                error.json()["Message"];
            });
    }

    cargarLocalidades() {
        this.localidadService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let localidad = new Localidad();
                    localidad = data[i];
                    this.lsLocalidades.push(localidad);
                }
            },
            error => {
                this.lsLocalidades = new Array<Localidad>();
                error.json()["Message"];
            });
    }

    limpiar() {
        this.existeJugador = false;
        this.visualizable = false;
        this.jugador = new Jugador();
    }

    calcularEdad() {
        const fechaActual = new Date();
        const fechaJugador = new Date(this.jugador.fecha_nacimiento);
        this.jugador.edad = fechaActual.getFullYear() - fechaJugador.getFullYear();

        if (fechaActual.getMonth() + 1 < fechaJugador.getMonth() + 1 ||
        (fechaActual.getMonth() + 1 === fechaJugador.getMonth() + 1 && fechaActual.getDate() < fechaJugador.getDate())) {
            this.jugador.edad--;
        }
    }

    cargarEquipos() {
        this.equipoService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let equipo = new Equipo();
                    equipo = data[i];
                    this.lsEquipos.push(equipo);
                }
            },
            error => {
                this.lsEquipos = new Array<Equipo>();
                error.json()['Message'];
            });
    }

    agregarLocalidad() {
        if (this.provincia.id_provincia != null) {
            this.dialogService.agregarLocalidad(this.provincia).subscribe(
                result => {
                    this.provincia_onChanged(this.provincia);
                });
        }
    }

    registrarJugador() {
        this.blockUI.start();
        this.jugadorService.create(this.jugador).subscribe(
            data => {
                this.toastr.success('El jugador se ha registrado correctamente.', 'Exito!');
                this.blockUI.stop();
            },
            error => {
                this.toastr.error('El jugador no se ha registrado.", "Error!');
                this.blockUI.stop();
            });
    }

// EVENTOS-----------------------------------------------------------------------
    provincia_onChanged(provincia: Provincia) {
        this.blockUI.start();
        this.provincia = provincia;
        this.localidadService.getByProvincia(provincia.id_provincia).subscribe(
            data => {
                this.lsLocalidades = [];
                for (let i = 0; i < data.length; i++) {
                    let localidad = new Localidad();
                    localidad = data[i];
                    this.lsLocalidades.push(localidad);
                }
                this.blockUI.stop();
            },
            error => {
                this.lsLocalidades = new Array<Localidad>();
                error.json()['Message'];
                this.blockUI.stop();
            });
    }
}
