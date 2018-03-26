import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DialogService } from '../../../services/common-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';
import { Usuario } from '../../../entities/index';
import { SharedService } from '../../../services/index';



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
        JugadorService,
        UsuarioService
    ]
})
export class JugadoresCargaComponent {
    @ViewChild('jugadorForm') jugadorForm: FormGroup;
    @BlockUI() blockUI: NgBlockUI;

    user: Usuario;

    public existeJugador: Boolean = false;
    public visualizable: Boolean = false;
    public esRepresentante: Boolean = false;
    public esJugadorBD: Boolean = false;
    public jugador = new Jugador();
    public tipoDocumento: TipoDocumento;
    public provincia: Provincia;
    public contacto: Contacto = new Contacto();

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
        private router: Router

    ) {
        this.jugador.contacto = this.contacto;
        this.jugador.rol = 'jugador';
        this.cargarTiposDocumento();
        this.cargarProvincias();
        this.cargarEquipos();
        this.verificarUsuario();
    }

    // METODOS-----------------------------------------------------------------------

    verificarUsuario() {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.blockUI.start();
        if (this.user.perfil.id_perfil != 1) {
            this.usuarioService.getEquipoRepresentante(this.user.id_usuario).subscribe(
                data => {
                    this.jugador.equipo = data;
                    this.esRepresentante = true;
                    this.blockUI.stop();
                }
            );
        } else { this.blockUI.stop();}
    }

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
        this.jugador.rol = 'jugador';
        this.verificarUsuario();
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
        this.blockUI.start();
        this.jugadorService.getByDoc(this.jugador.nro_documento).subscribe(
            data => {
                this.lsLocalidades = [];
                    let jugador = new Jugador();
                    jugador = data;
                    jugador.equipo = this.jugador.equipo;
                    jugador.rol = this.jugador.rol;
                    this.esJugadorBD = true;
                    if (this.jugador.id_foto != null) {
                        jugador.id_foto = this.jugador.id_foto;
                    }
                    this.jugador = jugador;
                    this.calcularEdad();
                    this.cargarFoto();
                    this.jugador.domicilio.localidad = jugador.domicilio.localidad.provincia.lsLocalidades.find(x => x.id_localidad != 0);
                    this.lsLocalidades.push(this.jugador.domicilio.localidad);
                    this.blockUI.stop();
            },
            error => {
                error.json()['Message'];
                this.blockUI.stop();
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
        if (this.jugador.domicilio.localidad.provincia.id_provincia != null) {
            this.dialogService.agregarLocalidad(this.jugador.domicilio.localidad.provincia).subscribe(
                result => {
                    this.provincia_onChanged(this.jugador.domicilio.localidad.provincia);
                });
        }
    }

    registrarJugador() {
        this.blockUI.start();
        this.jugadorService.create(this.jugador).subscribe(
            data => {
                this.toastr.success('El jugador se ha registrado correctamente.', 'Exito!');
                this.blockUI.stop();
                this.limpiar();
            },
            error => {
                this.toastr.error('El jugador no se ha registrado.", "Error!');
                this.blockUI.stop();
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
        this.jugador.domicilio.localidad.id_localidad = this.lsLocalidades.find(x => x.n_localidad == newValue).id_localidad;
        this.jugador.domicilio.localidad.n_localidad = newValue;
    }

    onProvinciaChange(newValue) {
        if (newValue != null) {
            this.jugador.domicilio.localidad.provincia.id_provincia = this.lsProvincias.find(x => x.n_provincia == newValue).id_provincia;
            this.jugador.domicilio.localidad.provincia.n_provincia = newValue;

            if (!this.esJugadorBD)
                this.lsLocalidades = this.lsProvincias.find(x => x.n_provincia == newValue).lsLocalidades;
        }
    }

    onEquipoChange(newValue) {
        if (newValue != null) {
            this.jugador.equipo.id_equipo = this.lsEquipos.find(x => x.nombre == newValue).id_equipo;
            this.jugador.equipo.nombre = newValue;
        }
    }
}
