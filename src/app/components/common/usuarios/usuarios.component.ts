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
    selector: 'usuarios',
    moduleId: module.id,
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
    providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {
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

    registrarUsuario() {
        this.usuario.perfil.id_perfil = 2;
        this.usuario.n_usuario = 'repre' + this.equipo.nombre;
        this.usuario.password = this.random();

        this.usuarioService.registrarRepresentante(this.usuario, this.equipo.id_equipo).subscribe(
            data => {
                if (data) {
                    this.toastr.success('El usuario fue dado de alta correctamente', 'Exito!');
                    this.limpiarCampos();
                    this.openConfirmationDialog(this.usuario, this.equipo);
                }
            }, error => {
                this.toastr.error('El nombre de usuario para ese equipo ya existe', 'Error!');
            }
        );
    }

    habilitar() {
        this.estaHabilitado = false;
    }
    openConfirmationDialog(usuario, equipo) {
        var conjunto = Array<any>();
        conjunto.push(usuario);
        conjunto.push(equipo);
        this.dialogRef = this.dialog.open(UsuariosDialog, {
            data: conjunto,
            height: '30%',
            width: '65%',
            disableClose: false,

        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
            this.dialogRef = null;
        });
    }

    random() {
        var password = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++) {
            password += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return password;
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