import { Component, ViewChild, Inject, forwardRef, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoginCargaComponent } from './index';
import { Usuario } from '../../../entities/index'
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomToastOption } from '../../../services/index';
import { NavComponent } from '../../../components/nav/index';
import { SharedService } from '../../../services/index';
@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthenticationService],
})
export class LoginComponent {
    @ViewChild('closeBtn') closeBtn: ElementRef;
    public usuario = new Usuario();
    user: Usuario;

    constructor(private authenticationService: AuthenticationService,
        public toastr: ToastsManager, private route: ActivatedRoute,
        private router: Router, private service: SharedService
    ) {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    }
    login() {
        this.authenticationService.login(this.usuario.n_usuario, this.usuario.password)
            .subscribe(
                data => {
                    this.toastr.info("Bienvenido a Golden", "Info");
                    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
                    this.service.addUser(this.user);
                    this.closeModal();
                },
                error => {
                    if (error["status"] == 400) {
                        this.toastr.error("El usuario ha expirado", "Error!");
                    } else {
                        this.toastr.error("El usuario y/o la contraseña son incorrectos", "Error!");
                    }
                });
    }

    logOut() {
        this.user = null;
        this.service.addUser(this.user);
        this.authenticationService.logout()
            .subscribe(
                data => {
                    this.router.navigate(['home/noticias']);
                },
                error => {
                });
    }

    private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }
}
