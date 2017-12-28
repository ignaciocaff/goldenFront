import { Component, ViewChild, Inject } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'login-carga',
    moduleId: module.id,
    templateUrl: './login-carga.component.html',
    styleUrls: ['./login-carga.component.css'],
    providers: []
})
export class LoginCargaComponent {
    constructor(
        public dialogRef: MatDialogRef<LoginCargaComponent>
    ) {

    }

    login() {
        console.error("Aca va la funcionalidad de login");
    }
}