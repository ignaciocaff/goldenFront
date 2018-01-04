import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DialogService } from '../../../services/common-services/index';


import {
    Jugador,
    TipoDocumento,
    Provincia,
    Localidad
} from '../../../entities/index';

import {
    TipoDocumentoService,
    ProvinciaService,
    LocalidadService,
    PersonaService
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
        DialogService
    ]
})
export class JugadoresCargaComponent {
    @ViewChild('jugadorForm') jugadorForm: FormGroup;
    @BlockUI() blockUI : NgBlockUI;

    public existeJugador: Boolean;
    public visualizable: Boolean;
    public jugador = new Jugador();
    public tipoDocumento: TipoDocumento;
    public provincia: Provincia;

    public lsProvincias = new Array<Provincia>();
    public lsLocalidades = new Array<Localidad>();
    public lsTiposDocumento = new Array<TipoDocumento>();

    constructor(
        private tipoDocumentoService: TipoDocumentoService,
        private provinciaService: ProvinciaService,
        private localidadService: LocalidadService,
        private personaService: PersonaService,
        private dialogService: DialogService,
    ) {
        this.existeJugador = false;
        this.visualizable = false;
        this.cargarTiposDocumento();
        this.cargarProvincias();
    }

    //METODOS-----------------------------------------------------------------------

    cargarTiposDocumento() {
        this.tipoDocumentoService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.json().length; i++) {
                    let tipoDocumento = new TipoDocumento(
                        data.json()[i]["id_tipo_documento"],
                        data.json()[i]["n_tipo_documento"]
                    );
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
                for (var i = 0; i < data.json().length; i++) {
                    let provincia = new Provincia(
                        data.json()[i]["id_provincia"],
                        data.json()[i]["n_provincia"]
                    );
                    this.lsProvincias.push(provincia);
                }
            },
            error => {
                this.lsProvincias = new Array<Provincia>();
                error.json()["Message"];
            });
    }

    limpiar(){
        this.existeJugador = false;
        this.visualizable = false;
        this.jugador = new Jugador();
    }

    calcularEdad(){
        var fechaActual = new Date();
        var fechaJugador = new Date(this.jugador.fecha_nacimiento);
        this.jugador.edad = fechaActual.getFullYear() - fechaJugador.getFullYear();

        if(fechaActual.getMonth()+1 < fechaJugador.getMonth()+1 || (fechaActual.getMonth()+1 == fechaJugador.getMonth()+1 && fechaActual.getDate() < fechaJugador.getDate())){
            this.jugador.edad--;
        }
    }

    //EVENTOS-----------------------------------------------------------------------
    provincia_onChanged(provincia: Provincia) {
        this.blockUI.start();
        this.provincia = provincia;
        this.localidadService.getByProvincia(provincia.id_provincia).subscribe(
            data => {
                this.lsLocalidades = [];
                for (var i = 0; i < data.json().length; i++) {
                    let localidad = new Localidad(
                        data.json()[i]["id_localidad"],
                        data.json()[i]["n_localidad"]
                    );
                    this.lsLocalidades.push(localidad);
                }
                this.blockUI.stop();
            },
            error => {
                this.lsLocalidades = new Array<Localidad>();
                error.json()["Message"];
                this.blockUI.stop();
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


}