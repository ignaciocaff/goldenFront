import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


import {
    Jugador,
    TipoDocumento,
    Nacionalidad,
    EstadoCivil,
    Provincia,
    Localidad, Contacto
} from '../../../entities/index';

@Component({
    selector: 'jugadores-carga',
    moduleId: module.id,
    templateUrl: './jugadores-carga.component.html',
    styleUrls: ['./jugadores-carga.component.css'],
    providers: []
})
export class JugadoresCargaComponent {
    @ViewChild('jugadorForm') jugadorForm: FormGroup;

    public existeJugador: Boolean;
    public visualizable: Boolean;
    public jugador = new Jugador();
    public tipoDocumento: TipoDocumento;
    public provincia: Provincia;
    public contacto: Contacto = new Contacto();

    public lsProvincias = new Array<Provincia>();
    public lsLocalidades = new Array<Localidad>();
    public lsTiposDocumento = new Array<TipoDocumento>();
    public lsNacionalidades = new Array<Nacionalidad>();
    public lsEstadosCivil = new Array<EstadoCivil>();

    constructor(
    ) {
        this.jugador.contacto = this.contacto;
        this.existeJugador = false;
        this.visualizable = false;
    }

    //METODOS-----------------------------------------------------------------------

}