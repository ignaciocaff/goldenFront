import { Component, ViewChild, Inject, forwardRef } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';
import { DialogService } from '../../../services/index'
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoginCargaComponent } from './index';

@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [DialogService]
})
export class LoginComponent {
    @ViewChild(forwardRef(() => LoginCargaComponent))
    loginDialogRef: MatDialogRef<LoginCargaComponent>;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
    ) {
    }

    loguear() {
        this.loginDialogRef = this.dialog.open(LoginCargaComponent, {
            disableClose: true,
            width: '30%',
        });
    }
}
