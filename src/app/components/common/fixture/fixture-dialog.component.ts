
import { Component, Input, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {
  Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
  Turno, IEquipo, IPartido, Partido
} from '../../../entities/index';
import { AppConfig } from '../../../app.config';
@Component({
  selector: 'fixture-dialog',
  templateUrl: './fixture-dialog.component.html',
  styleUrls: ['./fixture-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FixtureDialog {

  public partidos = new Array<IPartido>();

  constructor(public dialogRef: MatDialogRef<FixtureDialog>, @Inject(MAT_DIALOG_DATA) public data: any,
    public config: AppConfig) {

    this.partidos.push(data);
  }
}