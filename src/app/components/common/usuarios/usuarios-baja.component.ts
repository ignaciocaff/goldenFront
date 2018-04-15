import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { EquipoService } from '../../../services/index';
import { Equipo, Usuario } from '../../../entities/index';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UsuariosDialog } from './index';
import { UsuarioService } from '../../../services/entity-services/index';
@Component({
    selector: 'usuarios-baja',
    moduleId: module.id,
    templateUrl: './usuarios-baja.component.html',
    styleUrls: ['./usuarios-baja.component.css'],
    providers: [UsuarioService]
})
export class UsuarioBajaComponent implements OnInit {
    @ViewChild('usuarioForm') usuarioForm: FormGroup;
    dialogRef: MatDialogRef<UsuariosDialog>;

    public lsEquipos = new Array<Equipo>();
    public equipo = new Equipo();
    public usuario = new Usuario();
    public estaHabilitado: boolean = true;

    constructor(public toastr: ToastsManager,
        private router: Router, private equipoService: EquipoService,
        public dialog: MatDialog, private usuarioService: UsuarioService, ) {
    }

    ngOnInit() {
        this.equipoService.getAll().subscribe(
            data => {
                this.lsEquipos = [];
                for (var i = 0; i < data.length; i++) {
                    let equipo: Equipo;
                    equipo = data[i];
                    if (equipo.torneo.id_torneo != null && equipo.torneo.id_torneo == JSON.parse(sessionStorage.getItem('id_torneo'))) {
                        this.lsEquipos.push(equipo);
                    }
                }

            }, error => {

            }
        );
    }

    onChange(equipo: Equipo) {
        this.equipo = equipo;
    }

    bajaUsuario() {
        this.usuarioService.eliminarRepresentante(this.equipo.id_equipo).subscribe(
            data => {
                if (data) {
                    this.toastr.success('El usuario fue eliminado correctamente.', 'Exito!');
                    this.limpiarCampos();
                }
            }, error => {
                this.toastr.error('Ese equipo no tiene usuario asignado', 'Error!');
            }
        );
    }

    habilitar() {
        this.estaHabilitado = false;
    }

    routeAlta() {
        this.router.navigate(['home/usuarios']);
    }

    routeBaja() {
        this.router.navigate(['home/usuarios-baja']);
    }

    limpiarCampos() {
        this.usuario.caducidad = null;
        this.estaHabilitado = true;
        this.ngOnInit();
    }
}