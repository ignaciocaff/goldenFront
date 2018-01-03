import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, NgControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../error-matcher.component';
import {
    Jugador,
    TipoDocumento,
    Nacionalidad,
    EstadoCivil,
    Provincia,
    Localidad
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

    public lsProvincias = new Array<Provincia>();
    public lsLocalidades = new Array<Localidad>();
    public lsTiposDocumento = new Array<TipoDocumento>();
    public lsNacionalidades = new Array<Nacionalidad>();
    public lsEstadosCivil = new Array<EstadoCivil>();

    constructor(
    ) {
        this.existeJugador = false;
        this.visualizable = false;
    }

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    matcher = new MyErrorStateMatcher();

}