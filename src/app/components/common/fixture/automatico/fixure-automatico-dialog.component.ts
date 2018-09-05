
import { Component, Input, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {
    Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
    Turno, IEquipo, IPartido, Partido
} from '../../../../entities/index';
import { AppConfig } from '../../../../app.config';
@Component({
    selector: 'fixture-automatico-dialog',
    templateUrl: './fixture-automatico-dialog.component.html',
    styleUrls: ['./fixture-automatico-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FixtureAutomaticoDialog {

    public fixture = new Fixture();

    constructor(public dialogRef: MatDialogRef<FixtureAutomaticoDialog>, @Inject(MAT_DIALOG_DATA) public data: any,
        public config: AppConfig) {

        this.fixture = data;
    }
}