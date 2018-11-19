import { Component, Input, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Fecha,
  Sancion,
  TipoSancion,
  Jugador,
  Equipo
} from '../../../../entities/index';
import { FormGroup } from '@angular/forms';
import {
  SancionService,
  FixtureService
} from '../../../../services/entity-services/index';

@Component({
  selector: 'sancion-update-dialog',
  templateUrl: './sancion-dialog.html',
  styleUrls: ['./sancion-dialog.css']
})
export class SancionUpdateDialog implements OnInit {
  @ViewChild('sancionForm') sancionForm: FormGroup;
  id_jugador: Number;
  sancion = new Sancion();
  lsTiposSanciones = new Array<TipoSancion>();
  lsNuevasFechas = new Array<Fecha>();
  nuevaFecha = new Fecha();
  id_torneo: number;
  jugador = new Jugador();
  equipo = new Equipo();

  constructor(
    public sancionService: SancionService,
    public fixtureService: FixtureService,
    public toastr: ToastsManager,
    public dialogRefSancion: MatDialogRef<SancionUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.jugador = data.jugador;
    this.equipo = data.equipo;
    this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
  }

  ngOnInit() {
    this.sancionService.getAll().subscribe(
      data => {
        this.lsTiposSanciones = [];
        for (let i = 0; i < data.length; i++) {
          let tipoSancion: TipoSancion;
          tipoSancion = data[i];
          if (tipoSancion.id_tipo !== 1) {
            this.lsTiposSanciones.push(tipoSancion);
          }
        }
      },
      error => {}
    );

    this.sancionService.getUltimaSancion(this.jugador.id_jugador).subscribe(
      data => {
        this.sancion = data;
      },
      error => {}
    );

    this.sancionService.getZonaParaSancion(this.equipo.id_equipo).subscribe(
      data => {
        this.fixtureService
          .obtenerFechas(data.id_zona, this.id_torneo)
          .subscribe(
            dataF => {
              this.lsNuevasFechas = dataF.fechas;
            },
            error => {}
          );
      },
      error => {}
    );
  }

  modificarSancion() {
    this.sancion.fecha_fin = this.nuevaFecha;
    this.sancionService.updateUltimaSancion(this.sancion).subscribe(
      data => {
        this.dialogRefSancion.close({ data: this.sancion });
      },
      error => {
        this.toastr.error('La sanción no fue modificada. Intente nuevamente luego.', 'Error!');
      }
    );
  }

  onTipoSancionChange(newValue) {
    this.sancion.tipo_sancion.id_tipo = this.lsTiposSanciones.find(
      x => x.descripcion === newValue
    ).id_tipo;
  }

  onChangeNuevaFecha(obj: any) {
    this.nuevaFecha = obj;
  }
}
