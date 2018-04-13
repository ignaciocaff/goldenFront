import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DialogService } from '../../../services/common-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileService } from '../../../services/entity-services/file.service';
import { Usuario } from '../../../entities/index';
import { SharedService } from '../../../services/index';
import { LocalidadesCargaComponent } from '../localidades/index';
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
export class JugadoresCargaComponent implements OnInit {
    @ViewChild('jugadorForm') jugadorForm: FormGroup;

    user: Usuario;

    public existeJugador: boolean = false;
    public existejugador: boolean = false;
    public visualizable: boolean = false;
    public esRepresentante: boolean = false;
    public esJugadorBD: boolean = false;
    public jugador = new Jugador();
    public tipoDocumento: TipoDocumento;
    public provincia: Provincia;
    public contacto: Contacto = new Contacto();
    public localidadSeleccionada: Localidad = new Localidad();

    public lsProvincias = new Array<Provincia>();
    public lsLocalidades = new Array<Localidad>();
    public lsTiposDocumento = new Array<TipoDocumento>();
    public lsEquipos = new Array<Equipo>();

    errorMessage: String;
    images: Array<any> = [];
    arraySubidas: Array<any> = [];
    params: String;

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

    }

    // METODOS-----------------------------------------------------------------------
    ngOnInit() {
        this.jugador.contacto = this.contacto;
        this.jugador.rol = 'jugador';
        this.cargarTiposDocumento();
        this.cargarProvincias();
        this.cargarEquipos();

    }

    verificarUsuario() {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (this.user.perfil.id_perfil != 1) {
            this.usuarioService.getEquipoRepresentante(this.user.id_usuario).subscribe(
                data => {
                    this.jugador.equipo = data;
                    this.esRepresentante = true;
                }
            );
        } else { }
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
                error.json()['Message'];
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
                error.json()['Message'];
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
    }

    cargarEquipos() {
        this.equipoService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let equipo = new Equipo();
                    equipo = data[i];
                    if (equipo.torneo.id_torneo != null && equipo.torneo.id_torneo == JSON.parse(sessionStorage.getItem('id_torneo'))) {
                        this.lsEquipos.push(equipo);
                    }
                }
                this.verificarUsuario();
            },
            error => {
                this.lsEquipos = new Array<Equipo>();
                error.json()['Message'];
            });
    }

    consultarDatosjugador() {
        this.spinnerService.show();
        this.jugadorService.getByDoc(this.jugador.nro_documento).subscribe(
            data => {
                if (data['id_persona'] != null) {
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
                    this.jugador.domicilio.provincia.lsLocalidades[0] = jugador.domicilio.provincia.lsLocalidades.find(x => x.id_localidad != 0);
                    this.localidadSeleccionada.id_localidad = this.jugador.domicilio.provincia.lsLocalidades[0].id_localidad;
                    this.localidadSeleccionada.n_localidad = this.jugador.domicilio.provincia.lsLocalidades[0].n_localidad;
                    this.spinnerService.hide();
                }
            },
            error => {
                error.json()['Message'];
                this.spinnerService.hide();
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
        this.jugadorService.create(this.jugador).subscribe(
            data => {
                this.spinnerService.hide();
                this.toastr.success('El jugador se ha registrado correctamente.', 'Exito!');
                this.limpiar();
            },
            error => {
                this.spinnerService.hide();
                this.toastr.error('El jugador no se ha registrado.", "Error!');                
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
        if (newValue != null) {
            this.jugador.equipo = this.lsEquipos.find(x => x.nombre == newValue);
        }
    }
}
