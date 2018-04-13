import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DialogService } from '../../../services/common-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';
import { Usuario } from '../../../entities/index';
import { SharedService } from '../../../services/index';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
    JugadorService,
    UsuarioService,
} from '../../../services/entity-services/index';
import { stringify } from '@angular/compiler/src/util';

@Component({
    selector: 'jugadores-update',
    moduleId: module.id,
    templateUrl: './jugadores-update.component.html',
    styleUrls: ['./jugadores-update.component.css'],
    providers: [
        TipoDocumentoService,
        ProvinciaService,
        LocalidadService,
        PersonaService,
        DialogService,
        EquipoService,
        JugadorService,
        UsuarioService
    ]
})
export class JugadoresUpdateComponent {
    @ViewChild('jugadorForm') jugadorForm: FormGroup;

    user: Usuario;

    public existeJugador: Boolean = false;
    public equipoSeleccionado: Boolean = false;
    public visualizable: Boolean;
    public esRepresentante: Boolean;
    public esJugadorBD: Boolean;
    public jugador = new Jugador();
    public tipoDocumento: TipoDocumento;
    public provincia: Provincia;
    public contacto: Contacto = new Contacto();
    public localidadSeleccionada: Localidad = new Localidad();

    public lsProvincias = new Array<Provincia>();
    public lsLocalidades = new Array<Localidad>();
    public lsTiposDocumento = new Array<TipoDocumento>();
    public lsEquipos = new Array<Equipo>();

    errorMessage: string;
    images: Array<any> = [];
    arraySubidas: Array<any> = [];
    params: string;

    constructor(
        private tipoDocumentoService: TipoDocumentoService,
        private provinciaService: ProvinciaService,
        private localidadService: LocalidadService,
        private personaService: PersonaService,
        private dialogService: DialogService,
        private equipoService: EquipoService,
        private jugadorService: JugadorService,
        public toastr: ToastsManager,
        private fileService: FileService,
        private usuarioService: UsuarioService,
        private userService: SharedService,
        private router: Router,
        private spinnerService: Ng4LoadingSpinnerService,
    ) {
        this.jugador.contacto = this.contacto;
        this.jugador.rol = 'jugador';
        this.visualizable = false;
        this.esRepresentante = false;
        this.esJugadorBD = false;
        this.cargarTiposDocumento();
        this.cargarProvincias();
        this.cargarEquipos();
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
        this.jugadorForm.reset();
        this.existeJugador = false;
        this.visualizable = false;
        this.esJugadorBD = false;
        this.jugador = new Jugador();
        this.localidadSeleccionada = new Localidad();
        this.jugador.rol = 'jugador';
        this.images = [];
        this.lsLocalidades = [];
    }

    calcularEdad() {
        const fechaActual = new Date();
        const fechaJugador = new Date(this.jugador.fecha_nacimiento);
        this.jugador.edad = fechaActual.getFullYear() - fechaJugador.getFullYear();

        if (fechaActual.getMonth() + 1 < fechaJugador.getMonth() + 1 ||
            (fechaActual.getMonth() + 1 === fechaJugador.getMonth() + 1 && fechaActual.getDate() < fechaJugador.getDate())) {
            this.jugador.edad--;
        }

        if (!this.esJugadorBD || this.jugador.edad > 1900) {
            this.jugador.edad = this.jugador.edad - 1900;
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

    consultarDatosjugador() {
        this.spinnerService.show();
        this.jugadorService.obtenerJugador(this.jugador).subscribe(
            data => {
                if (data['id_jugador'] != null) {
                    var jugador = new Jugador();
                    jugador = data;
                    jugador.equipo = this.jugador.equipo;
                    this.esJugadorBD = true;
                    this.existeJugador = true;
                    if (this.jugador.id_foto != null) {
                        jugador.id_foto = this.jugador.id_foto;
                    }
                    this.jugador = jugador;
                    this.calcularEdad();
                    this.cargarFoto();
                    this.jugador.domicilio.provincia.lsLocalidades[0] = jugador.domicilio.provincia.lsLocalidades.find(x => x.id_localidad != 0);
                    this.localidadSeleccionada.id_localidad = this.jugador.domicilio.provincia.lsLocalidades[0].id_localidad;
                    this.localidadSeleccionada.n_localidad = this.jugador.domicilio.provincia.lsLocalidades[0].n_localidad;
                    this.spinnerService.hide();
                } else {
                    this.toastr.error('No existe un jugador con ese número de documento en ese equipo.", "Error!');
                    this.spinnerService.hide();
                }

            },
            error => {
                error.json()['Message'];
            });
    }

    cargarFoto() {
        this.fileService.getImagesByJugador(this.jugador.id_persona).subscribe(
            data => {
                if (data) {
                    this.images = [];
                    for (var i = 0; i < data.length; i++) {
                        this.images.push(data[i]);
                    }
                }
            },
            error => this.errorMessage = error
        );
    }

    agregarLocalidad() {
        if (this.jugador.domicilio.provincia.id_provincia != null) {
            this.dialogService.agregarLocalidad(this.jugador.domicilio.provincia).subscribe(
                result => {
                    this.lsProvincias = [];
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
                            error.json()['Message'];
                        });
                });
        }
    }

    registrarJugador() {
        this.spinnerService.show();
        this.jugadorService.create(this.jugador).subscribe(
            data => {
                this.toastr.success('El jugador se ha modificado correctamente.', 'Exito!');
                this.limpiar();
                this.spinnerService.hide();
            },
            error => {
                this.toastr.error('El jugador no se ha modificado.", "Error!');
                this.spinnerService.hide();
            });
    }

    routeAlta() {
        this.router.navigate(['home/jugadores-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/jugadores-update']);
    }

    // EVENTOS-----------------------------------------------------------------------
    provincia_onChanged(provincia) {
        this.onProvinciaChange(provincia);
    }

    getImageData() {
        var subidas = (localStorage.getItem('JUGADORES'));
        this.arraySubidas = JSON.parse(subidas);
        this.jugador.id_foto = Number(this.arraySubidas[0]);
        this.fileService.getImages(this.arraySubidas).subscribe(
            data => {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        this.images.push(data[i]);
                    }
                }
            },
            error => this.errorMessage = error
        );
    }

    refreshImages(status) {
        if (status == true) {
            console.log('Uploaded successfully!');
            this.images = [];
            this.getImageData();
        }
    }

    onTipoDocumentoChange(newValue) {
        if (newValue != null) {
            this.jugador.tipoDocumento.id_tipo_documento = this.lsTiposDocumento.find(x => x.descripcion == newValue).id_tipo_documento;
            this.jugador.tipoDocumento.descripcion = newValue;
        }
    }

    onLocalidadChange(newValue) {
        var loc = new Localidad();
        loc.id_localidad = this.lsLocalidades.find(x => x.n_localidad == newValue).id_localidad;
        loc.n_localidad = this.lsLocalidades.find(x => x.n_localidad == newValue).n_localidad;
        this.jugador.domicilio.provincia.lsLocalidades.splice(0, 1, loc);
    }

    onProvinciaChange(newValue) {
        if (newValue != null) {
            this.jugador.domicilio.provincia.id_provincia = this.lsProvincias.find(x => x.n_provincia == newValue).id_provincia;
            this.jugador.domicilio.provincia.n_provincia = newValue;
            this.lsLocalidades = this.lsProvincias.find(x => x.n_provincia == newValue).lsLocalidades;
        }
    }

    onEquipoChange(newValue) {
        if (newValue == "null") {
            this.equipoSeleccionado = false;
        }
        if (newValue != null) {
            this.jugador.equipo.id_equipo = this.lsEquipos.find(x => x.nombre == newValue).id_equipo;
            this.jugador.equipo.nombre = newValue;
            this.equipoSeleccionado = true;
        }

    }
}
