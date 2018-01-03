import { Component, ViewChild, Inject, forwardRef } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoginCargaComponent } from './index';
import { Usuario } from '../../../entities/index'
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthenticationService } from '../../../services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomToastOption } from '../../../services/index';

@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthenticationService]
})
export class LoginComponent {
    @BlockUI() blockUI: NgBlockUI;
    public usuario = new Usuario();
    constructor(private authenticationService: AuthenticationService, public toastr: ToastsManager) { }
    login() {
        this.blockUI.start();
        this.authenticationService.login(this.usuario.n_usuario, this.usuario.password)
            .subscribe(
            data => {
                this.blockUI.stop();
                this.toastr.info("Bienvenido a Golden", "Info");
            },
            error => {
                this.blockUI.stop();
                this.toastr.error("El usuario y/o la contraseña son incorrectos", "Error!");
            });
    }
}