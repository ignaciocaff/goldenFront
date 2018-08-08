import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { FixtureService, ZonaService } from '../../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppConfig } from '../../../../app.config';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FixtureAutomaticoDialog } from './fixure-automatico-dialog.component'
import { ParametrosFixture, TipoFixture, Zona } from '../../../../entities';

@Component({
    selector: 'fixture-automatico',
    moduleId: module.id,
    templateUrl: './fixture-automatico.component.html',
    styleUrls: ['./fixture-automatico.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ZonaService]
})
export class FixtureAutomaticoComponent implements OnInit {
    dialogRef: MatDialogRef<FixtureAutomaticoDialog>;
    id_torneo: number;
    id_fase: number;
    parametros = new ParametrosFixture();
    lsTiposFixture = new Array<TipoFixture>();
    visualizarZonas = false;
    lsZonas = new Array<Zona>();
    formValido: boolean = false;
    fechaMinima = new Date().toJSON().split('T')[0];

    constructor(
        private router: Router, public toastr: ToastsManager,
        public fixtureService: FixtureService, public zonaService: ZonaService, public dialog: MatDialog,
        public config: AppConfig,
        private spinnerService: Ng4LoadingSpinnerService) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.id_fase = Number(sessionStorage.getItem('fase'));
    }
    ngOnInit() {
        this.zonaService.getAll(this.id_torneo).subscribe(
            data => {
                this.lsZonas = [];
                for (var i = 0; i < data.length; i++) {
                    let zona: Zona;
                    zona = data[i];
                    if (zona.torneo.id_torneo != null) {
                        this.lsZonas.push(zona);
                    }
                }
            }, error => {

            }
        );

        this.fixtureService.obtenerTiposDeFixture().subscribe(
            data => {
                this.lsTiposFixture = data;
            }, error => {

            }
        );
        this.parametros.id_fase = this.id_fase;
        this.parametros.id_torneo = this.id_torneo;
        this.parametros.esInterzonal = false;
        this.parametros.intercalarLocalVisitante = true;
    }

    visualizarFixture() {
        this.spinnerService.show();
        this.fixtureService.generarFixtureAutomatico(this.parametros).subscribe(
            data => {
                this.spinnerService.hide();
                this.openConfirmationDialog(data);
            }, error => {
                this.spinnerService.hide();
                this.toastr.error("Ya existe un fixture para esa categoría.", "Error!")
            }
        );

    }

    openConfirmationDialog(newValue) {
        this.dialogRef = this.dialog.open(FixtureAutomaticoDialog, {
            data: newValue,
            height: '90%',
            width: '95%',
            disableClose: false,

        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
            this.dialogRef = null;
        });
    }

    tipoDeFixture(tipoDeFixture: TipoFixture) {
        if (tipoDeFixture.id_tipo == 1) {
            this.visualizarZonas = true;
            this.parametros.esInterzonal = false;
        } else if (tipoDeFixture.id_tipo == 2) {
            this.visualizarZonas = false;
            this.parametros.esInterzonal = true;
        } else {
            this.parametros.esInterzonal = false;
            this.visualizarZonas = false;
        }

        if (tipoDeFixture.id_tipo) {
            if (tipoDeFixture.id_tipo == 1 && !this.parametros.zona.id_zona) {
                this.formValido = false;
            } else {
                this.formValido = true;
            }
        } else {
            this.formValido = false;
        }
    }

    formValidation() {
        if (this.parametros.zona.id_zona && this.parametros.tipoDeFixture.id_tipo) {
            this.formValido = true;
        } else {
            this.formValido = false;
        }
    }
}